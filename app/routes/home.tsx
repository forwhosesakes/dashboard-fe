import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import DefaultBanner from "~/assets/images/default-banner.png";
import DefaultUserImg from "~/assets/images/default-user-img.png";
import { Breadcrumbs } from "~/components/app-breadcrumbs";
import {
  TrendingUp,
  ArrowUpRight,
  Settings,
  ArrowDownRight,
  UserRoundPlus,
  EllipsisVertical,
} from "lucide-react";
import { Chip } from "~/components/ui/chip";
import { Button } from "~/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import ActiveNow from "~/assets/icons/active-now.svg";
import Members from "~/assets/icons/members-icon.svg";
import TotalMembers from "~/assets/icons/total-members.svg";
import {
  redirect,
  useLoaderData,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router";
import { orgApi } from "~/lib/api/org";
import glossary from "~/constants/glossary";
import { authClient } from "~/lib/auth-client";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const serverUrl = context.cloudflare.env.BASE_URL;
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

  if (session && user && user.role === "user") {
    const org = await orgApi(serverUrl).getOrgByUserId(user.id);
    // if(!org)return redirect("/login")
    return redirect(`/org/${org.id}`);
  }

  const rawLatestOrgs = await orgApi(serverUrl).getLatestOrgs();
  const orgCount = await orgApi(serverUrl).getOrgCount();
  const membersCount = await orgApi(serverUrl).getMembersCount();

  return { rawLatestOrgs,orgCount,membersCount };
}
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}


type Org = {
  name: string;
  month: string;
  year: string;
  tags: Tag[];
};

type Tag = {
  name: string;
  theme: {
    bg: string;
    text: string;
    border: string;
  };
};
export default function Home({ loaderData }: Route.ComponentProps) {
  const { rawLatestOrgs,orgCount,membersCount } = useLoaderData();
  const [latestOrgs, setLatestOrgs] = useState<Org[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("24h");
  const timeFilters = [
    { id: "24h", label: "24 ساعة" },
    { id: "7d", label: "7 أيام" },
    { id: "30d", label: "30 يوماً" },
    { id: "12m", label: "12 شهراً" },
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    // const data = rawLatestOrgs.map((org)=>{
    //   const date = new Date(org.createdAt)
    //   const year = date.getUTCFullYear();
    //   const monthIndex = date.getUTCMonth()
    //   const month = monthNames[monthIndex]
    //   return{
    //     name:org.name,
    //     month,
    //     year,
    //     tags:[{
    //       name:glossary.latestOrgs[org.type].name,
    //       theme:{
    //         bg:glossary.latestOrgs[org.type].theme.bg,
    //         text:glossary.latestOrgs[org.type].theme.text,
    //         border:glossary.latestorgs[org.type].theme.border
    //       }}
    //     ]
    //   }
    // })
    const data = rawLatestOrgs.map((org) => {
      
      const date = new Date(org.createdAt);
      const year = date.getUTCFullYear();
      const monthIndex = date.getUTCMonth();
      const month = monthNames[monthIndex];

      return {
        name: org.name,
        month,
        year,
        tags: [
          {
            name: glossary.latestOrgs[org.type]?.name,
            theme: {
              bg: glossary.latestOrgs[org.type]?.theme.bg,
              text: glossary.latestOrgs[org.type]?.theme.text,
              border: glossary.latestOrgs[org.type]?.theme.border,
            },
          },
          {
            name: glossary.latestOrgs[org.category]?.name,
            theme: {
              bg: glossary.latestOrgs[org.category]?.theme.bg,
              text: glossary.latestOrgs[org.category]?.theme.text,
              border: glossary.latestOrgs[org.category]?.theme.border,
            },
          },
        ],
      };
    });

    setLatestOrgs(data);

    document.title = " كدان | Kedan ";
  }, []);

  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">(() => {

    return "light";
  });
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className=" w-full h-full">
     

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
              <Breadcrumbs items={[{ label: "الرئيسية", href: "/" }]} />
            </div>
            <p className="text-primary-foreground font-bold text-3xl">
              شركة كدان
            </p>
            <p className="text-primary-foreground/60">KIDAN@gmail.com</p>
          </div>
        </div>

        {/* <div className="flex flex-col  justify-between w-2/5">
      

          <div className="border flex place-self-end items-center divide-x divide-border rtl:divide-x-reverse  rounded-lg  gap-1 w-fit">
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
          </div>
        </div> */}
      </div>

      <div className="w-11/12 mx-auto mt-8 p-4">
        {/* First Row - 3 cells */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="border rounded-lg p-4 bg-card flex flex-col">
            <div className="h-3/5 flex gap-2">
              <div className="border max-h-fit shadow-[-1px_1px_4px_0px_rgba(0,0,0,0.05)] p-1.5 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>

              <div className="flex flex-col">
                <p>المبالغ المستردة من الضريبة</p>
                <h4 className="text-accent font-bold ">12,420</h4>
              </div>

              <div className="flex self-end place-self-end mr-auto justify-center text-center gap-1 items-center border rounded-lg p-0.5 px-1">
                <p className="text-xs ">100%</p>
                <ArrowUpRight className="text-accent h-3 w-3 font-bold" />
              </div>
            </div>
            <div className="border-t -mx-4 my-4" />

            <div className="h-2/5 flex justify-between items-center ">
              <Button className="border text-sm max-w-fit">عرض التقارير</Button>

              <button>
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-card flex flex-col">
            <div className="h-3/5 flex gap-2">
              <div className="border max-h-fit shadow-[-1px_1px_4px_0px_rgba(0,0,0,0.05)] p-1.5 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>

              <div className="flex flex-col">
                <p>المبالغ المستردة من الضريبة</p>
                <h4 className="text-accent font-bold ">12,420</h4>
              </div>

              <div className="flex self-end place-self-end mr-auto justify-center text-center gap-1 items-center border rounded-lg p-0.5 px-1">
                <p className="text-xs">100%</p>
                <ArrowUpRight className="text-accent h-3 w-3 font-bold" />
              </div>
            </div>
            <div className="border-t -mx-4 my-4" />

            <div className="h-2/5 flex justify-between items-center ">
              <Button className="border text-sm max-w-fit">عرض التقارير</Button>

              <button>
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-card flex flex-col">
            <div className="h-3/5 flex gap-2">
              <div className="border max-h-fit shadow-[-1px_1px_4px_0px_rgba(0,0,0,0.05)] p-1.5 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>

              <div className="flex flex-col">
                <p>المبالغ المستردة من الضريبة</p>
                <h4 className="text-accent font-bold ">12,420</h4>
              </div>

              <div className="flex self-end place-self-end mr-auto justify-center text-center gap-1 items-center border rounded-lg p-0.5 px-1">
                <p className="text-xs">100%</p>
                <ArrowUpRight className="text-accent h-3 w-3 font-bold" />
              </div>
            </div>
            <div className="border-t -mx-4 my-4" />

            <div className="h-2/5 flex justify-between items-center ">
              <Button className="border text-sm max-w-fit">عرض التقارير</Button>

              <button>
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div> */}

        {/* Second Row - 2 cells */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 bg-card flex flex-col">
            <div className="h-3/5 flex gap-2">
              <div className="border max-h-fit shadow-[-1px_1px_4px_0px_rgba(0,0,0,0.05)] p-1.5 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>

              <div className="flex flex-col">
                <p>عدد الجمعيات</p>
                <h4 className="text-accent font-bold ">{orgCount.count}</h4>
              </div>
{/* 
              <div className="flex self-end place-self-end mr-auto justify-center text-center gap-1 items-center border rounded-lg p-0.5 px-1">
                <p className="text-xs">6%</p>
                <ArrowUpRight className="text-accent h-3 w-3 font-bold" />
              </div> */}
            </div>
            <div className="border-t -mx-4 my-4" />

            {/* <div className="h-2/5 flex justify-between items-center ">
              <Button className="border text-sm max-w-fit bg-accent text-primary hover:text-primary-foreground">
                عرض التقارير
              </Button>

              <button>
                <Settings className="w-4 h-4" />
              </button>
            </div> */}
          </div>

          <div className="border rounded-lg p-4 bg-card flex flex-col">
            <div className="h-3/5 flex gap-2">
              <div className="border max-h-fit shadow-[-1px_1px_4px_0px_rgba(0,0,0,0.05)] p-1.5 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>

              <div className="flex flex-col">
                <p>عدد  الأعضاء</p>
                <h4 className="text-accent font-bold ">{membersCount.count}</h4>
              </div>

              {/* <div className="flex self-end place-self-end mr-auto justify-center text-center gap-1 items-center border rounded-lg p-0.5 px-1">
                <p className="text-xs">100%</p>
                <ArrowDownRight className="text-red-500 h-3 w-3 font-bold" />
              </div> */}
            </div>
            <div className="border-t -mx-4 my-4" />
{/* 
            <div className="h-2/5 flex justify-between items-center ">
              <Button className="border text-sm max-w-fit">عرض التقارير</Button>

              <button>
                <Settings className="w-4 h-4" />
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="mt-5  flex gap-5 w-full">
        {/* <div className="w-10/12 ">
          <h5 className="text-primary-foreground my-5">
            ابدأ في إنشاء مستخدمين
          </h5>
          <div className="flex gap-3">
            <div className="bg-accent w-1/2 border p-3 rounded-lg flex">
              <div className="p-2 bg-primary border w-fit rounded-lg flex items-center justify-center">
                <UserRoundPlus className="h-6 w-6" />
              </div>
              <div
                onClick={() => navigate("/cp/users/org/create-edit")}
                className="mx-2 cursor-pointer flex flex-col"
              >
                <p className="text-primary font-bold text-base">
                  أضف مستخدم جديد
                </p>
              </div>
            </div>

            <div className=" w-1/2 border p-3 rounded-lg flex">
              <div className="p-2 bg-primary border w-fit rounded-lg flex items-center justify-center">
                <PenLine className="h-6 w-6" />
              </div>
              <div className="mx-2 flex flex-col">
                <p className="text-primary-foreground font-bold text-base">
                  أنشئ لوحة معلومات جديدة
                </p>

                <p className="text-primary-foreground/60 text-sm font-thin">
                  اغمر في المحرر وابدأ في الإنشاء
                </p>
              </div>
            </div>
          </div>

        ÷
        </div> */}

        <div className="w-2/12 min-w-56 mt-12 flex flex-col">
          <p className="text-sm text-primary-foreground my-5">
            الجمعيات المضافة حديثاً
          </p>
          <div className="my-1 flex flex-col gap-2">
            {latestOrgs.map((charity) => (
              <div key={charity?.name} className="flex gap-2">
                <img className="w-10 h-10" src={DefaultUserImg} alt="" />
                <div className="flex flex-col text-pretty">
                  <p>{charity?.name}</p>
                  <p className="text-primary-foreground/60">
                    عضو منذ {charity?.month} {charity?.year}
                  </p>
                  <div className="flex gap-1">
                    {charity?.tags?.filter(tag=>tag?.name)?.map((tag) => (
                      <div
                        key={tag?.name}
                        className={`border rounded-xl p-0.5 px-1.5 text-xs ${tag?.theme?.bg} ${tag?.theme?.text} ${tag?.theme?.border}`}
                      >
                        {tag?.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
