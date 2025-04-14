import { useEffect, useRef, useState } from "react";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { dashboardApi, type DashboardType } from "~/lib/api/dashboard";
import { useThemeStore } from "~/lib/store/theme-store";
import DashboardIndicators from "~/routes/cp/users/dashboard/components/DashboardIndicators";
import { tabsNames } from "./constants/glossary";
import { Button } from "~/components/ui/button";
import { Maximize2 } from "lucide-react";
import { Breadcrumbs } from "~/components/app-breadcrumbs";


export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const { id, dashboardType } = params;
const serverUrl = context.cloudflare.env.BASE_URL

let entriesMap=[];
let rawEntries=[];
if (dashboardType !== "GOVERNANCE") {
  const result = await dashboardApi(
    serverUrl
  ).getEntries(`${id}`, (dashboardType as DashboardType) ?? "GENERAL");
  
  entriesMap = result.entriesMap as any[];
  rawEntries = result.rawEntries;
}

  let indicators=dashboardType==="GOVERNANCE"?await dashboardApi(serverUrl).getGovernanceIndicators(`${id}`):
  await dashboardApi(
    serverUrl
  ).getIndicators(`${id}`, (dashboardType as DashboardType) ?? "GENERAL")




  return {
    entriesMap: entriesMap?.length ? entriesMap[0] : null,
    rawEntries: rawEntries?.length ? rawEntries[0] : null,
    indicators: indicators?.length ? indicators[0] : null,
    currentDashboard: dashboardType,
    baseUrl: serverUrl,
    id,
  };
};

const Dashbaord = () => {
  const { id, currentDashboard, indicators, entries } = useLoaderData();
  
  const locationData = useLocation();
  const { setLightTheme, setDarkTheme, theme } = useThemeStore();

  
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
                isFullscreen={isFullscreen}
                indicators={{ ...entries, ...indicators }}
                type={currentDashboard}
                logoUrl={locationData.state.logoUrl??""} role={"client"}              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashbaord;
