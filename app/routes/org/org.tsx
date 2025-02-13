import { useEffect } from "react";
import { NavLink, redirect, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { dashboardApi } from "~/lib/api/dashboard";
import { orgApi } from "~/lib/api/org";
import { authClient } from "~/lib/auth-client";
import DefaultBanner from "~/assets/images/default-banner.png";
import DefaultUserImg from "~/assets/images/default-user-img.png";
import { Breadcrumbs } from "~/components/app-breadcrumbs";
import { Button } from "~/components/ui/button";
import { Layers } from "lucide-react";
import { dashboardStatusMap } from "../cp/users/dashboard/constants/glossary"


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
    org = await orgApi(serverUrl).getOrgByUderId(
      "naaXdX1LaI0Z24SkDduNydZuGEPCz729"
    );
    
    if (Number(id) !== org.id) {
      return redirect(`/org/${org.id}`);
    }
  } else if (session && user && user.role === "admin") {
    return redirect(`/`);
  }

  //   const org = orgApi(serverUrl).getOrgByUderId(user.id)

  const dashboardsOverview = await dashboardApi(serverUrl).getOrgDashboards(id);
  console.log("org:: ", org);
  return { dashboardsOverview, org };
};
const Org = () => {
  const { dashboardsOverview, org } = useLoaderData<typeof loader>();

  useEffect(() => {
    console.log(dashboardsOverview);
  }, []);

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
                  { label: "الرئيسية", href: "/" },
                  { label: "لوحة البيانات", href: "/" },
                ]}
              />
            </div>
            <p className="text-primary-foreground font-bold text-3xl">
              {org.name}
            </p>
            <p className="text-primary-foreground/60">{org.email}</p>
          </div>
        </div>

        <div className="flex flex-col  justify-between w-2/5">
          {/* <div className="relative w-2/5">
            <InputField placeholder="البحث..." className="w-full" />
            <div className="absolute left-2 text-primary-foreground/40 top-[6px]">
              <Search className="h-5 w-5" />
            </div>
          </div> */}

          {/* <div className="border flex place-self-end items-center divide-x divide-border rtl:divide-x-reverse  rounded-lg  gap-1 w-fit">
            {timeFilters.map((filter) => (
              <Chip
                key={filter.id}
                selected={selectedFilter === filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`text-primary-foreground  `}
              >
                {filter.label}
              </Chip>
            ))}
          </div> */}
        </div>
      </div>

      {/* dashboards */}
      <div className="flex justify-between p-5">
        <div>
          <h5>{`المؤشرات`}</h5>
          <p className="text-primary-foreground/75">{`اختر خطة حساب تناسب سير عملك.`}</p>
        </div>
        <div className="flex gap-x-4">
          <NavLink state={{ dashboardsOverview }} to={"GENERAL"}>
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
              key={dashboard.title}
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

      
    </div>
  );
};

export default Org;
