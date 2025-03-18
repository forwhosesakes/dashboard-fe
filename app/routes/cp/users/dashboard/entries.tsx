import {
  useLoaderData,
  useLocation,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useEffect, useRef, useState } from "react";
import {
  dashboardApi,
  type DashboardOverviewType,
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
import { Breadcrumbs } from "~/components/app-breadcrumbs";
import type { RootNode, EntryNode } from "~/types/api.types";
import {
  createCorporateTemplate,
  createFinancialTemplate,
  createOperationalTemplate,
} from "./initialTemplates";
import { useSidebarStore } from "~/lib/store/sidebar-store";

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  let { id, dashboardType } = params;

  const {entriesMap,rawEntries} = await dashboardApi(
    context.cloudflare.env.BASE_URL
  ).getEntries(`${id}`, (dashboardType as DashboardType) ?? "GENERAL");

  const indicators = await dashboardApi(
    context.cloudflare.env.BASE_URL
  ).getIndicators(`${id}`, (dashboardType as DashboardType) ?? "GENERAL");

  return {
    entriesMap: entriesMap?.length ? entriesMap[0] : null,
    rawEntries: rawEntries?.length ? rawEntries[0] : null,
    indicators: indicators?.length ? indicators[0] : null,
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
  const { rawEntries,entriesMap, indicators, currentDashboard, baseUrl, id } = useLoaderData<{
    currentDashboard: DashboardType;
    baseUrl: string;
    id: string;
    indicators: any[];
    rawEntries: any;
    entriesMap:any
  }>();

  

  const locationData = useLocation();
  const [view, setView] = useState<"entries" | "indicators">("entries");
  const [loading, setLoading] = useState(false);
  const { setLightTheme, theme } = useThemeStore();

  const [currentEntries, setCurrentEntries] = useState<RootNode | any>({
    key: "ROOT",
    value: null,
    children: [],
  });

  const [rawEntriesState,setRawEntriesState]= useState<any>(rawEntries)


  useEffect(()=>{
    setRawEntriesState(rawEntries)
  },[rawEntries])

  useEffect(() => {
    // console.log("indicators",indicators);
    
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

      await dashboardApi(baseUrl).saveEntries({
        id,
        type: currentDashboard,
        entries: body,
      });
      
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

  const { isExpanded, toggleSidebar, setSidebarState } = useSidebarStore();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        setIsFullscreen(false);
        toggleSidebar();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isFullscreen, toggleSidebar]);
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current
        ?.requestFullscreen()
        .then(() => {setIsFullscreen(true); toggleSidebar(); })
        .catch((err) => console.error("Error entering fullscreen"));
    } else {
      document
        .exitFullscreen()
        .then(() => {setIsFullscreen(false); toggleSidebar();})
        .catch((err) => console.error("Error exiting fullscreen"));
    }
  };

  return (
    <>
      <DashboardHeader
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

          <TabsContent value={currentDashboard}>
            <div
              className={` overflow-y-auto overflow-x-hidden ${
                theme.includes("dark") && "bg-[#0A0E12]"
              }`}
              ref={containerRef}
            >
              {view === "entries" ? (
                <>
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
                  indicators={{ ...entriesMap, ...indicators }}
                  type={currentDashboard}
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
export default Entries;
