import { useEffect, useRef, useState } from "react";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { dashboardApi } from "~/lib/api/dashboard";
import { useThemeStore } from "~/lib/store/theme-store";
import DashboardIndicators from "~/routes/cp/users/dashboard/components/DashboardIndicators";
import { tabsNames } from "./constants/glossary";
import { Button } from "~/components/ui/button";
import { Maximize2 } from "lucide-react";
import { Breadcrumbs } from "~/components/app-breadcrumbs";


export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const { id, dashboardType } = params;

  console.log("from loader:: ", id, dashboardType);

  const entries = await dashboardApi(
    context.cloudflare.env.BASE_URL
  ).getEntries(`${id}`, (dashboardType as DashboardType) ?? "GENERAL");

  const indicators = await dashboardApi(
    context.cloudflare.env.BASE_URL
  ).getIndicators(`${id}`, (dashboardType as DashboardType) ?? "GENERAL");

  return {
    id,
    currentDashboard: dashboardType,
    indicators: indicators.length ? indicators[0] : null,
    entries:entries.length? entries[0]:null
  };
};

const Dashbaord = () => {
  const { id, currentDashboard, indicators, entries } = useLoaderData();
  const locationData = useLocation();
  const { setLightTheme, setDarkTheme, theme } = useThemeStore();

  // useEffect(() => {

  //     const dashboardsOverview = locationData.state?.dashboardsOverview;
  //     if (dashboardsOverview) {

  //       const currentDasboardData = dashboardsOverview.find((dashboard) =>
  //         dashboard.title.includes(currentDashboard)
  //       );

  //       if (currentDasboardData) {

  //         if (currentDasboardData.status === "NOT_STARTED") {
  //           const initialEntries = Object.entries(
  //             initialValues[currentDashboard]
  //           ).map(([key, value]) => ({
  //             name: key,
  //             label: entriesLabels[currentDashboard][key] ?? key,
  //             value,
  //           }));
  //           setCurrentEntries(initialEntries);
  //         } else {
  //           const excludedKeys = ["id", "dashbaordId", "createdAt", "updatedAt"];
  //           const newEntries = Object.entries(entries)
  //             .filter(([key]) => !excludedKeys.includes(key))
  //             .map(([key, value], i) => ({
  //               name: key,
  //               label: entriesLabels[currentDashboard][key] ?? key,
  //               value,
  //             }));
  //           setCurrentEntries(newEntries);
  //         }
  //       }
  //     }
  //   }, [currentDashboard]);

  useEffect(() => {
    setDarkTheme();
    return () => {
      setLightTheme();
    };
  }, []);

  const navigate = useNavigate();
  const handleTabChange = (value: string) => {
    navigate(`/org/${id}/${value}`, {
      state: locationData.state,
    });
  };

  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current
        ?.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.error("Error entering fullscreen"));
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((err) => console.error("Error exiting fullscreen"));
    }
  };
  return (
    <div>
      <div className="flex justify-between p-5">
        <div>
          <h5>
            {currentDashboard === "FINANCIAL"
              ? "الأداء المالي"
              : currentDashboard === "OPERATIONAL"
              ? "الأداء التشغيلي"
              : currentDashboard === "CORPORATE"
              ? "الأداء المؤسسي"
              : "العام"}
          </h5>
          <Breadcrumbs items={[
            {label:"الرئيسية", href:`/`},
           {label:currentDashboard === "FINANCIAL"
            ? "الأداء المالي"
            : currentDashboard === "OPERATIONAL"
            ? "الأداء التشغيلي"
            : currentDashboard === "CORPORATE"
            ? "الأداء المؤسسي"
            : "العام"}
          ]}/>
        </div>

        <div className="">
          <Button onClick={toggleFullscreen} className="border border-white w-9 p-2">
          <Maximize2 className=""/>
          </Button>
        </div>
      </div>
      <div id="tabs" className="w-full h-full border-t pt-2">
        <Tabs
          defaultValue={currentDashboard}
          dir="rtl"
          className="w-full"
          onValueChange={handleTabChange}
        >
          <TabsList className="w-full justify-start bg-transparent">
            {locationData.state?.dashboardsOverview.map((tab) => (
              <TabsTrigger value={tab.title.split("_")[1]}>
                {tabsNames[tab.title.split("_")[1]]}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={currentDashboard}>
            <div className={`p-4  overflow-auto ${theme.includes("dark")&&"bg-[#0A0E12]"}`}
                ref={containerRef}
                >
              <DashboardIndicators
                indicators={{...entries,...indicators}}
                type={currentDashboard}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashbaord;
