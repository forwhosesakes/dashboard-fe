import {
  NavLink,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import SemiCircleProgress from "~/components/ui/semi-circle-progress";
import { useEffect, useState } from "react";
import {
  dashboardApi,
  type DashboardType,
} from "~/lib/api/dashboard";
import { entriesLabels, tabsNames } from "./constants/glossary";
import DashboardEntries from "./components/DashboardEntries";
import DashboardHeader from "./components/DashboardHeader";
import ViewSwitch from "./components/ViewSwitch";
import { initialValues } from "./constants/initialValues";
import DashboardIndicators from "./components/DashboardIndicators";
import { toasts } from "~/lib/utils/toast";
import { useThemeStore } from "~/lib/store/theme-store";



export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  console.log("params:: ", params);

  let { id, dashboardType } = params;

  const entries = await dashboardApi(
    context.cloudflare.env.BASE_URL
  ).getEntries(`${id}`, (dashboardType as DashboardType) ?? "GENERAL");


  const indicators = await dashboardApi(context.cloudflare.env.BASE_URL).getIndicators(`${id}`, (dashboardType as DashboardType) ?? "GENERAL")
  console.log("entries :: ", entries);
  console.log("indicators::",indicators)

  // if (!entries[0]) return redirect(`/cp/users/org/${id}/dashboard`);


  return {
    entries:(entries)[0],
    indicators: indicators.length? indicators[0]:null,
    currentDashboard: dashboardType,
    baseUrl: context.cloudflare.env.BASE_URL,
    id,
  };
};

const Entries = ({
  currentIndicator,
}: {
  currentIndicator: { name: string };
}) => {


  const { entries,indicators, currentDashboard, baseUrl, id } = useLoaderData();
  const locationData = useLocation();
  const [view, setView] = useState<"entries" | "indicators">("entries");
  const [loading,setLoading] = useState(false)
  const {setLightTheme}=useThemeStore()

  const [currentEntries, setCurrentEntries] = useState<
    { name: string; value: any; label: string }[]
  >([]);

  useEffect(() => {
    
    const dashboardsOverview = locationData.state?.dashboardsOverview;
    if (dashboardsOverview) {
 

      
      const currentDasboardData = dashboardsOverview.find((dashboard) =>
        dashboard.title.includes(currentDashboard)
      );

      if (currentDasboardData) {

        if (currentDasboardData.status === "NOT_STARTED") {
          const initialEntries = Object.entries(
            initialValues[currentDashboard]
          ).map(([key, value]) => ({
            name: key,
            label: entriesLabels[currentDashboard][key] ?? key,
            value,
          }));
          setCurrentEntries(initialEntries);
        } else {
          const excludedKeys = ["id", "dashbaordId", "createdAt", "updatedAt"];
          const newEntries = Object.entries(entries)
            .filter(([key]) => !excludedKeys.includes(key))
            .map(([key, value], i) => ({
              name: key,
              label: entriesLabels[currentDashboard][key] ?? key,
              value,
            }));
          setCurrentEntries(newEntries);
        }
      }
    }
  }, [currentDashboard]);


  useEffect(()=>{
    console.log("mounted");

    return ()=>{
      setLightTheme()
      
    }
    
  },[])


  const navigate = useNavigate();
  const handleTabChange = (value: string) => {
    navigate(`/cp/users/org/${id}/dashboard/${value}`, {
      state: locationData.state,
    });
  };

  const saveEntries = async () => {
    try {
      setLoading(true)
      const requestBody = {};
      currentEntries.forEach((entry) => {
        requestBody[entry.name] = entry.value;
      });
      const result = await dashboardApi(baseUrl).saveEntries({
        id,
        type: currentDashboard,
        entries: requestBody,
      });
      toasts.success({message:"تم حفظ المدخلات بنجاح"})
      console.log("Indicators: ", result.indicators.data[0]);
      setLoading(false)

    } catch (e) {
      console.error("Failed to save entries:", e);
      setLoading(false)
      toasts.error({message:"   حدث خطأ أثناء حفظ المدخلات"})


    }
  };
  return (
    <>
      <DashboardHeader dashboardType={currentDashboard} onSave={saveEntries} loading={loading} />
      <ViewSwitch hasIndicators={!!indicators} view={view} onViewChange={setView} />
      {/* <div className="flex justify-between p-5">
        <div>
          <h5>{`${currentIndicator?.name ?? "مؤشر الأداء المالي"}`}</h5>
          <p className="text-primary-foreground/75">{`أدخل بيانات المؤشر.`}</p>
        </div>
        <div className="flex gap-x-4">
            <Button variant={"secondary"} onClick={saveEntries}>{"حفظ المدخلات"}</Button>
          <NavLink to={`dashboard`}>
            <Button variant={"outline"}>{"تعديل"}</Button>
          </NavLink>
        </div>
      </div> */}

      <div id="tabs" className="w-full h-full border-t pt-2">
        <Tabs
          defaultValue={currentDashboard}
          dir="rtl"
          className="w-full"
          onValueChange={handleTabChange}
        >
          <TabsList className="w-full justify-start bg-transparent">
            {/* <TabsTrigger value="GENERAL"></TabsTrigger>

            <TabsTrigger value="FINANCIAL"></TabsTrigger>

            <TabsTrigger value="OPERATIONAL"></TabsTrigger>

            <TabsTrigger value="CORPORATE"></TabsTrigger> */}
            {locationData.state?.dashboardsOverview.map((tab) => (
              <TabsTrigger value={tab.title.split("_")[1]}>
                {tabsNames[tab.title.split("_")[1]]}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={currentDashboard}>
            <div className="p-4">
              {/* Content for مؤشر الأداء المالي */}
              {view === "entries" ? (
                <>
                  {/* <div className="flex flex-col justify-center items-center">
                    <SemiCircleProgress percentage={86} />
                    <p className="font-semibold text-primary-foreground/50">
                      نسبة إكمال البيانات
                    </p>
                  </div> */}
                  <DashboardEntries
                    dashboardType={currentDashboard}
                    entries={currentEntries}
                    onEntryChange={(name, value) => {
                      const updatedEntries = currentEntries.map((entry) =>
                        entry.name === name ? { ...entry, value } : entry
                      );
                      setCurrentEntries(updatedEntries);
                    }}
                    status={"COMPLETED"}
                  />
                </>
              ) : (
                <DashboardIndicators indicators={indicators} type={currentDashboard}/>
               
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
export default Entries;


