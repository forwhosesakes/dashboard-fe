import { useEffect } from "react";
import {
  NavLink,
  redirect,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router";
import { dashboardApi } from "~/lib/api/dashboard";
import { orgApi } from "~/lib/api/org";
import { authClient } from "~/lib/auth-client";
import DefaultBanner from "~/assets/images/default-banner.png";
import DefaultUserImg from "~/assets/images/default-user-img.png";
import { Breadcrumbs } from "~/components/app-breadcrumbs";
import { Layers } from "lucide-react";
import { dashboardStatusMap } from "../cp/users/dashboard/constants/glossary";
import { useThemeStore } from "~/lib/store/theme-store";



export const loader = async ({
  request,
  context,
  params,
}: LoaderFunctionArgs) => {
  
  const serverUrl = context.cloudflare.env.BASE_URL;
  const { id } = params;

  if (!id) return { error: "Error at getting Organization id" };

  const cookieHeader = request.headers.get("Cookie");
  const res = await authClient(serverUrl).getSession({
    fetchOptions: {
      headers: {
        Cookie: cookieHeader || "",
      },
      // credentials: "include",
    },
  });

  const session = res.data?.session;
  const user = res.data?.user;
  let org;
  if (session && user && user.role === "user") {
    
    org = await orgApi(serverUrl).getOrgByUserId(
      user.id
    );
    console.log("org1::",org.logo);
    

    if (Number(id) !== org.id) {
      return redirect(`/org/${org.id}`);
    }
  } else if (session && user && user.role === "admin") {
    return redirect(`/`);
  }

  //   const org = orgApi(serverUrl).getOrgByUserId(user.id)

  const dashboardsOverview = await dashboardApi(serverUrl).getOrgDashboards(id);
  return { dashboardsOverview, org, logoUrl:`https://pub-78d8970765b1464a831d610935e4371c.r2.dev/${JSON.parse(org.logo)[0]}` };
};
const Org = () => {
  const { dashboardsOverview, org, logoUrl } = useLoaderData<any>();


  const newDashboardsTitles = {
    NEW_CORPORATE_INDICATORS:"اللوحة المؤسسية",
    NEW_FINANCIAL_INDICATORS:"اللوحة المالية",
    NEW_OPERATIONAL_INDICATORS:"اللوحة التشغيلية",
    NEW_GENERAL_INDICATORS:"اللوحة العامة",
    NEW_GOVERNANCE_INDICATORS:"لوحة الحوكمة"

  }
  return (
    <div className="w-full h-full">
      <div className="max-h-[240px] overflow-hidden h-full  rounded-lg">
        <img className="w-full h-full" src={DefaultBanner} alt="" />
      </div>
      <div className="w-full  mt-5 flex justify-between items">
        {/* user icon wrapper */}
        <div className="w-3/5  flex">
          <div className="relative overflow-visible w-48">
            <div className="absolute -top-20 rounded-full w-48 h-48">
              <img className="" src={DefaultUserImg} alt="" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="">
              <Breadcrumbs
                items={[
                  { label: "الرئيسية", href: `/org/${org.id}` },

                ]}
              />
              
            </div>
            <p className="text-primary-foreground font-bold text-3xl">
              {org.name}
            </p>
            <p className="text-primary-foreground/60">{org.email}</p>
          </div>
        </div>

        <div className="flex flex-col  justify-between w-2/5"></div>
      </div>

      {/* dashboards */}
      <div className="flex justify-between p-5">
        <div>
          <h5>{`المؤشرات`}</h5>
        </div>
      </div>

      <div id="overview" className={`w-full h-full border-t pt-2 `}>
        <div className="w-10/12 h-1/3 mt-8  mx-auto flex flex-wrap items-center justify-start gap-4">
          {dashboardsOverview &&
            dashboardsOverview.filter((dashboard)=>!dashboard.title.includes("GENERAL")).map((dashboard) => {
              return (
                <NavLink
                  key={dashboard.title}
                  state={{ dashboardsOverview,logoUrl}}
                  to={dashboard.title.split("_")[1]}
                  className="w-5/12 border h-44 hover:border-accent rounded-lg group"
                  
                >
                  <div className="w-full flex m-2 items-center gap-3 h-1/6">
                    <div className="border p-2 rounded-lg">
                      <Layers className="h-5 w-5" />
                    </div>
                   { newDashboardsTitles[dashboard.title]}
                  </div>
                  <div
                    id="bottom-section"
                    className="border-t group-hover:border-accent flex flex-col py-5 px-5 h-5/6"
                  >
                    <div className="flex justify-between">
                      <div className="flex gap-2 items-end ">
                        <h3 className="text-primary-foreground">{dashboard.title === "NEW_FINANCIAL_INDICATORS"?38: dashboard.title === "NEW_OPERATIONAL_INDICATORS" ? 22 :dashboard.title === "NEW_GENERAL_INDICATORS" ? 0:36}</h3>
                        <p>مُدخل</p>
                      </div>
                      <div className="flex border rounded-lg px-2 py-1 justify-center items-center gap-2">
                        <p>{dashboardStatusMap[dashboard.status]}</p>
                        <div
                          className={`h-1.5 w-1.5 
                      ${
                        dashboard.status === "COMPLETED"
                          ? `bg-green-600`
                          : dashboard.status === "NOT_STARTED"
                          ? `bg-red-600`
                          : `bg-orange-500`
                      } rounded-full`}
                        ></div>
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
    </div>
  );
};

export default Org;
