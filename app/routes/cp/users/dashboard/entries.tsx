import {
  NavLink,
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import SemiCircleProgress from "~/components/ui/semi-circle-progress";
import { useEffect, useRef, useState } from "react";
import {
  dashboardApi,
  type DashboardType,
} from "~/lib/api/dashboard";
import { entriesLabels, tabsNames } from "./constants/glossary";
import DashboardEntries from "./components/DashboardEntries";
import DashboardHeader from "./components/DashboardHeader";
import ViewSwitch from "./components/ViewSwitch";
import { initialValues } from "./constants/initialValues";

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  console.log("params:: ", params);

  let { id, dashboardType } = params;

  const entries = await dashboardApi(
    context.cloudflare.env.BASE_URL
  ).getEntries(`${id}`, (dashboardType as DashboardType) ?? "GENERAL");
  console.log("entries :: ", entries);

  // if (!entries[0]) return redirect(`/cp/users/org/${id}/dashboard`);

  console.log("entries general please",entries[0] );
  

  return {
    entries: entries[0],
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
  const { entries, currentDashboard, baseUrl, id } = useLoaderData();
  const locationData = useLocation();
  const [view, setView] = useState<"entries" | "indicators">("entries");
  const [currentEntries, setCurrentEntries] = useState<
    { name: string; value: any; label: string }[]
  >([]);

  useEffect(() => {
    console.log("overview:: ", locationData.state);
    const dashboardsOverview = locationData.state?.dashboardsOverview;
    if (dashboardsOverview) {
 

      const currentDasboardData = dashboardsOverview.find((dashboard) =>
        dashboard.title.includes(currentDashboard)
      );
      if (currentDasboardData) {

        setDashboardStatus(currentDasboardData.status);
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

  // const inputRefs = useRef<(HTMLInputElement | null)[]>([]);  // Add this line
  const [dashboardStatus, setDashboardStatus] = useState<
    "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"
  >("NOT_STARTED");

  const [entryToEdit, setEntryToEdit] = useState<{
    name: string;
    value: number;
  } | null>(null);

  const [currentIndecators, setCurrentInticators] = useState<
    { name: string; value: any; label: string }[]
  >([{ name: "المؤشر 1", label: "اسم المؤشر", value: 45 }]);

  const navigate = useNavigate();
  const handleTabChange = (value: string) => {
    navigate(`/cp/users/org/${id}/dashboard/${value}`, {
      state: locationData.state,
    });
  };

  const saveEntries = async () => {
    try {
      const requestBody = {};
      currentEntries.forEach((entry) => {
        requestBody[entry.name] = entry.value;
      });
      const result = await dashboardApi(baseUrl).saveEntries({
        id,
        type: currentDashboard,
        entries: requestBody,
      });
      console.log("Indicators: ", result.indicators.data[0]);
      setCurrentInticators(result.indicators.data[0]);
    } catch (e) {
      console.error("Failed to save entries:", e);
    }
  };
  return (
    <>
      <DashboardHeader dashboardType={currentDashboard} onSave={saveEntries} />
      <ViewSwitch view={view} onViewChange={setView} />
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
                  <div className="flex flex-col justify-center items-center">
                    <SemiCircleProgress percentage={86} />
                    <p className="font-semibold text-primary-foreground/50">
                      نسبة إكمال البيانات
                    </p>
                  </div>
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
                <div>Inicators view (Coming Soon)</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
export default Entries;
