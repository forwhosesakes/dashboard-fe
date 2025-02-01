import { Layers } from "lucide-react";
import { NavLink, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Button } from "~/components/ui/button";
import { dashboardApi, type DashboardOverviewType } from "~/lib/api/dashboard";
import { dashboardStatusMap } from "./constants/glossary"
import { useEffect } from "react";

type LoaderData = {
    dashboardsOverview: DashboardOverviewType[];
    error?: string;
  };

export const loader = async ({ context, params }: LoaderFunctionArgs) => {
  const serverUrl = context.cloudflare.env.BASE_URL;
  const { id } = params;

  if (!id) return { error: "Error at getting Organization id" };

  const dashboardsOverview = await dashboardApi(serverUrl).getOrgDashboards(id);
console.log("overview:: ",dashboardsOverview);

  return { dashboardsOverview };
};

const Dashbaord = () => {
  const { dashboardsOverview } = useLoaderData<typeof loader>();

useEffect(()=>{
    console.log(dashboardsOverview);
    
},[])
  return (
    <>
      <div className="flex justify-between p-5">
        <div>
          <h5>{`المؤشرات`}</h5>
          <p className="text-primary-foreground/75">{`اختر خطة حساب تناسب سير عملك.`}</p>
        </div>
        <div className="flex gap-x-4">
          <NavLink state={{dashboardsOverview}} to={"GENERAL"}>
            <Button variant={"secondary"}>{"عرض المؤشرات"}</Button>
          </NavLink>
          <NavLink to={`dashboard`}>
            <Button variant={"outline"}>{"secondary"}</Button>
          </NavLink>
        </div>
      </div>

      <div id="overview" className={`w-full h-full border-t pt-2 `}>
        <div className="w-10/12 h-1/3 mt-8  mx-auto flex flex-wrap items-center  justify-center gap-4">
          {dashboardsOverview && dashboardsOverview.map((dashboard) => {
            return (
              <NavLink
              
              state={{dashboardsOverview}} to={dashboard.title.split("_")[1]} className="w-5/12 border h-44 hover:border-accent rounded-lg group">
                <div className="w-full flex m-2 items-center gap-3 h-1/6">
                  <div className="border p-2 rounded-lg">
                    <Layers className="h-5 w-5"/>
                  </div>
                  {dashboard.title}
                </div>
                <div id="bottom-section" className="border-t group-hover:border-accent flex flex-col py-5 px-5 h-5/6">
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-end ">
                      <h3 className="text-primary-foreground">43</h3>
                      <p>مُدخل</p>
                    </div>
                    <div className="flex border rounded-lg px-2 py-1 justify-center items-center gap-2">
                      <p>{dashboardStatusMap[dashboard.status]}</p>
                      <div className={`h-1.5 w-1.5 
                      ${dashboard.status === "COMPLETED" ? `bg-green-600`
                      : dashboard.status === "NOT_STARTED" ? `bg-red-600`
                      : `bg-orange-500`
                      } rounded-full`}></div>
                    </div>
                  </div>
                  <div className="flex items-center w-full h-full">
                    <p>تعريف بالمؤشر</p>
                  </div>
                </div>
              </NavLink>
              
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashbaord;
