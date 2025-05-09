import {
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  type LoaderFunctionArgs,
} from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useEffect, useRef, useState } from "react";
import {
  dashboardApi,
  type DashboardOverviewType,
  type DashboardType,
} from "~/lib/api/dashboard";
import {  tabsNames } from "./constants/glossary";
import DashboardEntries from "./components/DashboardEntries";
import DashboardHeader from "./components/DashboardHeader";
import ViewSwitch from "./components/ViewSwitch";
import {  initialValues } from "./constants/initialValues";
import DashboardIndicators from "./components/DashboardIndicators";
import { toasts } from "~/lib/utils/toast";
import { useThemeStore } from "~/lib/store/theme-store";
import { Breadcrumbs } from "~/components/app-breadcrumbs";
import type { RootNode } from "~/types/api.types";
import {
  createCorporateTemplate,
  createFinancialTemplate,
  createOperationalTemplate,
} from "./initialTemplates";
import { OrganizationsAPI } from "~/services/org";
import type { TOrganization } from "~/types/users.types";
import { Spinner } from "~/components/ui/spinner";
import GovernanceEntries from "./components/governanceEntries";


export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  let { id, dashboardType } = params;
const serverUrl = context.cloudflare.env.BASE_URL
 const response = await OrganizationsAPI.getById(Number(id),serverUrl)
 if (response.status !== "success") {
  throw new Error(response.message);
}
const responseData = response.data as TOrganization;
const logoName =JSON.parse(responseData["logo"])[0]
const orgName= responseData["name"]
const publicLogoUrl = `https://pub-78d8970765b1464a831d610935e4371c.r2.dev/${logoName}` 
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
    orgName,
    entriesMap: entriesMap?.length ? entriesMap[0] : null,
    rawEntries: rawEntries?.length ? rawEntries[0] : null,
    indicators: indicators?.length ? indicators[0] : null,
    currentDashboard: dashboardType,
    baseUrl: serverUrl,
    id,
    logoUrl:publicLogoUrl
  };
};

const Entries = () => {
  const { rawEntries,entriesMap, indicators, currentDashboard, logoUrl, baseUrl, id ,orgName} = useLoaderData<{
    currentDashboard: DashboardType |"GOVERNANCE";
    baseUrl: string;
    id: string;
    indicators: any[];
    rawEntries: any;
    entriesMap:any;
    logoUrl:string;
    orgName:string
  }>();

  

  const locationData = useLocation();
  const [view, setView] = useState<"entries" | "indicators">("entries");
  const [loading, setLoading] = useState(false);
  const { setLightTheme, setDarkTheme, theme } = useThemeStore();
  const [currentIndicators, setCurrentIndicators]=useState<any[]|null>(indicators)
  const [currentEntries, setCurrentEntries] = useState<RootNode | any>({
    key: "ROOT",
    value: null,
    children: [],
  });

  const [rawEntriesState,setRawEntriesState]= useState<any>(rawEntries??initialValues[currentDashboard])
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  



  useEffect(()=>{
    setRawEntriesState(rawEntries??initialValues[currentDashboard])
  },[rawEntries])

  useEffect(() => {
    
    if (indicators === null) {
      setView("entries");
      setLightTheme();
    }
    
    const dashboardsOverview: DashboardOverviewType[] =
      locationData.state?.dashboardsOverview;
    if (dashboardsOverview) {
      const currentDasboardData = dashboardsOverview.find((dashboard: any) =>
        dashboard.title.includes(currentDashboard)
      );
      setCurrentIndicators(indicators)

      if (currentDasboardData) {
        if (currentDasboardData.status === "NOT_STARTED" || entriesMap === null) {
          let initialEntries;
          try {
            if (currentDashboard === "FINANCIAL") {
              initialEntries = createFinancialTemplate()[0];
            } else if (currentDashboard === "CORPORATE") {
              initialEntries = createCorporateTemplate()[0];
            } else if (currentDashboard === "OPERATIONAL") {
              initialEntries = createOperationalTemplate()[0];
            } else {
              initialEntries = { key: "ROOT", value: null, children: {} };
              console.warn(
                `No template available for dashboard: ${currentDashboard}`
              );
            }
            setCurrentEntries(initialEntries ?? null);
          } catch (e) {
            console.error(
              `Error creating iniaialData for ${currentDashboard}:`,
              e
            );
            setCurrentEntries({ key: "ROOT", value: null, children: {} });
          }
        } else {
          setCurrentEntries(entriesMap);
        }
      }
    }
  }, [currentDashboard]);

  useEffect(() => {
    return () => {
      setLightTheme();
    };
  }, []);

  useEffect(() => {
    if (view === "entries") {
      setLightTheme();
    } else if (view === "indicators") {
      setDarkTheme();
    }
  }, [view, setLightTheme, setDarkTheme]);

  const navigate = useNavigate();
  const handleTabChange = (value: string) => {
    navigate(`/cp/users/org/${id}/dashboard/${value}`, {
      state: locationData.state,
    });
  };

  const saveEntries = async () => {
    try {
      setLoading(true);

      // console.log(currentEntries);
      
      // const checkedData = propagateNullValuesUpTree(currentEntries.children);
      // const requestBody = flattenNodeStructure(currentEntries.children);
      const {dashbaordId, id:_, createdAt, updatedAt, ...body} = rawEntriesState

      const response = await dashboardApi(baseUrl).saveEntries({
        id,
        type: currentDashboard,
        entries: body,
      });

      const newIndicators = response.indicators.data[0]
      setCurrentIndicators(newIndicators)

      
      toasts.success({ message: "تم حفظ المدخلات بنجاح" });
      setLoading(false);
    } catch (e) {
      console.error("Failed to save entries:", e);
      setLoading(false);
      toasts.error({ message: "   حدث خطأ أثناء حفظ المدخلات" });
    }
  };

  const removeEntries = async () => {
    try {
      setLoading(true);
      const requestBody = {};

      await dashboardApi(baseUrl).removeEntries(id, currentDashboard);
      toasts.success({ message: "تم إعادة تعيين اللوحة بنجاح" });
      setLoading(false);
    } catch (e) {
      console.error("Failed to save entries:", e);
      setLoading(false);
      toasts.error({ message: "حدث خطأ أثناء إعادة تعيين اللوحة" });
    }
  };

  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement ) {
        setIsFullscreen(false)
        
      }else{
        setIsFullscreen(true)
        
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current
        ?.requestFullscreen()
        .then(() => {setIsFullscreen(true);})
        .catch((err) => console.error("Error entering fullscreen"));
    } else {
      document
        .exitFullscreen()
        .then(() => {setIsFullscreen(false);})
        .catch((err) => console.error("Error exiting fullscreen"));
    }
  };

  return (
    <>
      <DashboardHeader
      orgName={orgName}
        dashboardType={currentDashboard}
        onSave={saveEntries}
        loading={loading}
        onDelete={removeEntries}
      />
      <Breadcrumbs
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "الجمعيات", href: "/cp/users" },
          { label: "بيانات الجمعية", href: `/cp/users/org/${id}/` },
          {
            label:
              currentDashboard === "FINANCIAL"
                ? "الأداء المالي"
                : currentDashboard === "OPERATIONAL"
                ? "الأداء التشغيلي"
                : currentDashboard === "CORPORATE"
                ? "الأداء المؤسسي"
                : currentDashboard === "GOVERNANCE"
                ?" الحوكمة"
                : "العام",
            href: `/cp/users/org/${id}/dashboard/${currentDashboard}`,
          },
        ]}
      />
      <ViewSwitch
        hasIndicators={!!indicators}
        view={view}
        onViewChange={setView}
        toggleFullscreen={toggleFullscreen}
      />

      <div id="tabs" className="w-full h-full border-t pt-2">
        <Tabs
          defaultValue={currentDashboard}
          dir="rtl"
          className="w-full"
          onValueChange={handleTabChange}
        >
          <TabsList className="w-full justify-start bg-transparent">
            {locationData.state?.dashboardsOverview.map((tab: any) => (
              <TabsTrigger key={tab.title} value={tab.title.split("_")[1]}>
                {
                  //@ts-ignore
                  tabsNames[tab.title.split("_")[1]]
                }
              </TabsTrigger>
            ))}
          </TabsList>

          {isNavigating? <div className="flex w-full  h-[50vh] items-center justify-center"><Spinner className="text-secondary-700" size={"large"}/></div>:<TabsContent value={currentDashboard}>
  <div
              className={` overflow-y-auto overflow-x-hidden ${theme.includes("dark") && "bg-[#000]"}`}
              ref={containerRef}
            >
              {view === "entries" ?  currentDashboard==="GOVERNANCE"?<GovernanceEntries/>:(
               
                <>
                {/* <p>{JSON.stringify(currentEntries)}</p>
                <p className="text-red-800">{JSON.stringify(rawEntriesState)}</p> */}

                  {
                    <DashboardEntries
                      key={currentDashboard}
                      dashboardType={currentDashboard}
                      rawEntries={rawEntriesState}
                      entries={currentEntries}
                      onEntryChange={(name, value) => {
                        setRawEntriesState((prev:any)=>({...prev, [name]:value}));
                      }}
                      status={"COMPLETED"}
                    />
                  }
                </>
              ) : (
                <DashboardIndicators
                    indicators={{ ...entriesMap, ...currentIndicators }}
                    type={currentDashboard}
                    role={"admin"}
                    logoUrl={logoUrl} 
                    isFullscreen={isFullscreen}
                    />
              )}
            </div>
          </TabsContent>}
        </Tabs>
      </div>
    </>
  );
};
export default Entries;
