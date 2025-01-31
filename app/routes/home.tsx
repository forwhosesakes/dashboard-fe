import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { toasts } from "~/lib/utils/toast";
import DefaultBanner from "~/assets/images/default-banner.png";
import DefaultUserImg from "~/assets/images/default-user-img.png";
import { Breadcrumbs } from "~/components/app-breadcrumbs";
import { InputField, Input } from "~/components/ui/input-field";
import {
  Search,
  TrendingUp,
  ArrowUpRight,
  Settings,
  ArrowDownRight,
  UserRoundPlus,
  PenLine,
  EllipsisVertical,
} from "lucide-react";
import { Chip } from "~/components/ui/chip";
import { Button } from "~/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import ActiveNow from "~/assets/icons/active-now.svg";
import Members from "~/assets/icons/members-icon.svg";
import TotalMembers from "~/assets/icons/total-members.svg";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 200, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 110, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 800, pv: 2400, amt: 2400 },
];

const renderCustomAxisTick = ({ x, y, payload }) => {
  let path = "";

  switch (payload.value) {
    case "Page A":
      path =
        "M899.072 99.328q9.216 13.312 17.92 48.128t16.384 81.92 13.824 100.352 11.264 102.912 9.216 90.112 6.144 60.928q4.096 30.72 7.168 70.656t5.632 79.872 4.096 75.264 2.56 56.832q-13.312 16.384-30.208 25.6t-34.304 11.264-34.304-2.56-30.208-16.896q-1.024-10.24-3.584-33.28t-6.144-53.76-8.192-66.56-8.704-71.68q-11.264-83.968-23.552-184.32-7.168 37.888-11.264 74.752-4.096 31.744-6.656 66.56t-0.512 62.464q1.024 18.432 3.072 29.184t4.608 19.968 5.12 21.504 5.12 34.304 5.12 56.832 4.608 90.112q-11.264 24.576-50.688 42.496t-88.576 29.696-97.28 16.896-74.752 5.12q-18.432 0-46.08-2.56t-60.416-7.168-66.048-12.288-61.952-17.92-49.664-24.064-28.16-30.208q2.048-55.296 5.12-90.112t5.632-56.832 5.12-34.304 5.12-21.504 4.096-19.968 3.584-29.184q2.048-27.648-0.512-62.464t-6.656-66.56q-4.096-36.864-11.264-74.752-13.312 100.352-24.576 184.32-5.12 35.84-9.216 71.68t-8.192 66.56-6.656 53.76-2.56 33.28q-13.312 12.288-30.208 16.896t-34.304 2.56-33.792-11.264-29.696-25.6q0-21.504 2.048-56.832t4.096-75.264 5.632-79.872 6.656-70.656q2.048-20.48 6.144-60.928t9.728-90.112 11.776-102.912 13.824-100.352 16.384-81.92 17.92-48.128q20.48-12.288 56.32-25.6t73.216-26.624 71.168-25.088 50.176-22.016q10.24 13.312 16.896 61.44t13.312 115.712 15.36 146.432 23.04 153.6l38.912-334.848-29.696-25.6 43.008-54.272 15.36 2.048 15.36-2.048 43.008 54.272-29.696 25.6 38.912 334.848q14.336-74.752 23.04-153.6t15.36-146.432 13.312-115.712 16.896-61.44q16.384 10.24 50.176 22.016t71.168 25.088 73.216 26.624 56.32 25.6";
      break;
    case "Page B":
      path =
        "M662.528 451.584q10.24 5.12 30.208 16.384t46.08 31.744 57.856 52.736 65.024 80.896 67.072 115.2 64.512 154.624q-15.36 9.216-31.232 21.504t-31.232 22.016-31.744 15.36-32.768 2.56q-44.032-9.216-78.336-8.192t-62.976 7.68-53.248 16.896-47.616 19.968-46.08 16.384-49.664 6.656q-57.344-1.024-110.592-16.896t-101.376-32.256-89.6-25.088-75.264 4.608q-20.48 8.192-41.984 1.024t-38.912-18.432q-20.48-13.312-39.936-33.792 37.888-116.736 86.016-199.68t92.672-136.704 78.848-81.408 43.52-33.792q9.216-5.12 10.24-25.088t-1.024-40.448q-3.072-24.576-9.216-54.272l-150.528-302.08 180.224-29.696q27.648 52.224 53.76 79.36t50.176 36.864 45.568 5.12 39.936-17.92q43.008-30.72 80.896-103.424l181.248 29.696q-20.48 48.128-45.056 99.328-20.48 44.032-47.616 97.28t-57.856 105.472q-12.288 34.816-13.824 57.344t1.536 36.864q4.096 16.384 12.288 25.6z";
      break;
    default:
      path = "";
  }

  return (
    <svg
      x={x - 12}
      y={y + 4}
      width={24}
      height={24}
      viewBox="0 0 1024 1024"
      fill="#666"
    >
      <path d={path} />
    </svg>
  );
};

export default function Home({ loaderData }: Route.ComponentProps) {
  const [selectedFilter, setSelectedFilter] = useState("24h");
  const timeFilters = [
    { id: "24h", label: "24 ساعة" },
    { id: "7d", label: "7 أيام" },
    { id: "30d", label: "30 يوماً" },
    { id: "12m", label: "12 شهراً" },
  ];

  const recentCharity = [
    {
      name: "جمعية البر بأبها",
      month: "فبراير",
      year: "2025",
      tags: [{name:"أوقاف", theme:{bg:"bg-[#eef4ff]",text:"text-[#3538cd]",border:"border-[#c6d7fe]"}}, {name:"رعاية الأيتام",theme:{bg:"bg-[#eff8ff]",text:"text-[#175cd3]",border:"border-[#b2ddff]"}}, {name:"ملابس",theme:{bg:"bg-[#f9f5ff]",text:"text-[#6941c6]",border:"border-[#e9d7fe]"}}],
    },
    {
      name: "جمعية قيم بالخفجي",
      month: "يناير",
      year: "2025",
      tags: [{name:"أوقاف", theme:{bg:"bg-[#eef4ff]",text:"text-[#3538cd]",border:"border-[#c6d7fe]"}}, {name:"رعاية الأيتام",theme:{bg:"bg-[#eff8ff]",text:"text-[#175cd3]",border:"border-[#b2ddff]"}}, {name:"ملابس",theme:{bg:"bg-[#f9f5ff]",text:"text-[#6941c6]",border:"border-[#e9d7fe]"}}],
    },
    {
      name: "جمعية البر بعنيزة",
      month: "مارس",
      year: "2025",
      tags: [{name:"أوقاف", theme:{bg:"bg-[#eef4ff]",text:"text-[#3538cd]",border:"border-[#c6d7fe]"}}, {name:"رعاية الأيتام",theme:{bg:"bg-[#eff8ff]",text:"text-[#175cd3]",border:"border-[#b2ddff]"}}, {name:"ملابس",theme:{bg:"bg-[#f9f5ff]",text:"text-[#6941c6]",border:"border-[#e9d7fe]"}}],
    },
    {
      name: "جمعية الزكاة بالرياض",
      month: "أبريل",
      year: "2025",
      tags: [{name:"أوقاف", theme:{bg:"bg-[#eef4ff]",text:"text-[#3538cd]",border:"border-[#c6d7fe]"}}, {name:"رعاية الأيتام",theme:{bg:"bg-[#eff8ff]",text:"text-[#175cd3]",border:"border-[#b2ddff]"}}, {name:"ملابس",theme:{bg:"bg-[#f9f5ff]",text:"text-[#6941c6]",border:"border-[#e9d7fe]"}}],
    },
    {
      name: "جمعية الإحسان بالدمام",
      month: "مايو",
      year: "2025",
      tags: [{name:"أوقاف", theme:{bg:"bg-[#eef4ff]",text:"text-[#3538cd]",border:"border-[#c6d7fe]"}}, {name:"رعاية الأيتام",theme:{bg:"bg-[#eff8ff]",text:"text-[#175cd3]",border:"border-[#b2ddff]"}}, {name:"ملابس",theme:{bg:"bg-[#f9f5ff]",text:"text-[#6941c6]",border:"border-[#e9d7fe]"}}],
    },
    {
      name: "جمعية الرحمة بجدة",
      month: "يونيو",
      year: "2025",
      tags: [{name:"أوقاف", theme:{bg:"bg-[#eef4ff]",text:"text-[#3538cd]",border:"border-[#c6d7fe]"}}, {name:"رعاية الأيتام",theme:{bg:"bg-[#eff8ff]",text:"text-[#175cd3]",border:"border-[#b2ddff]"}}, {name:"ملابس",theme:{bg:"bg-[#f9f5ff]",text:"text-[#6941c6]",border:"border-[#e9d7fe]"}}],
    },
    {
      name: "جمعية السلام بحائل",
      month: "يوليو",
      year: "2025",
      tags: [{name:"أوقاف", theme:{bg:"bg-[#eef4ff]",text:"text-[#3538cd]",border:"border-[#c6d7fe]"}}, {name:"رعاية الأيتام",theme:{bg:"bg-[#eff8ff]",text:"text-[#175cd3]",border:"border-[#b2ddff]"}}, {name:"ملابس",theme:{bg:"bg-[#f9f5ff]",text:"text-[#6941c6]",border:"border-[#e9d7fe]"}}],
    },
  ];
const navigate = useNavigate()
  const [theme, setTheme] = useState<"light" | "dark">(() => {

    // if (typeof window !== "undefined") {
    //   return (
    //     (localStorage.getItem("theme") as "light" | "dark") ||
    //     (window.matchMedia("(prefers-color-scheme:dark").matches
    //       ? "dark"
    //       : "light")
    //   );
    // }
    return "light";
  });
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const showToast = () => {
    toasts.success({
      message: "test",
      description: "test toast",
    });
  };
  return (
    <div className=" w-full h-full">
      {/* <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" tick={renderCustomAxisTick} />
        <YAxis />
        <Tooltip />
      </LineChart>
      <h1>هاي احمد</h1>

      <button
        className=" bg-secondary mr-5 border-2 w-52 h-52"
        onClick={showToast}
      >
        toast
      </button>

      <button
        onClick={toggleTheme}
        className="bg-secondary text-primary-foreground hover:bg-secondary-700  transition-colors"
      >
        change theme
      </button> */}

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
              شركة كدان
            </p>
            <p className="text-primary-foreground/60">KIDAN@gmail.com</p>
          </div>
        </div>

        <div className="flex flex-col  justify-between w-2/5">
          <div className="relative w-2/5">
            <InputField placeholder="البحث..." className="w-full" />
            <div className="absolute left-2 text-primary-foreground/40 top-[6px]">
              <Search className="h-5 w-5" />
            </div>
          </div>

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
        </div>
      </div>

      <div className="w-11/12 mx-auto mt-8 p-4">
        {/* First Row - 3 cells */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
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
        </div>

        {/* Second Row - 2 cells */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 bg-card flex flex-col">
            <div className="h-3/5 flex gap-2">
              <div className="border max-h-fit shadow-[-1px_1px_4px_0px_rgba(0,0,0,0.05)] p-1.5 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>

              <div className="flex flex-col">
                <p>عدد العملاء</p>
                <h4 className="text-accent font-bold ">56</h4>
              </div>

              <div className="flex self-end place-self-end mr-auto justify-center text-center gap-1 items-center border rounded-lg p-0.5 px-1">
                <p className="text-xs">6%</p>
                <ArrowUpRight className="text-accent h-3 w-3 font-bold" />
              </div>
            </div>
            <div className="border-t -mx-4 my-4" />

            <div className="h-2/5 flex justify-between items-center ">
              <Button className="border text-sm max-w-fit bg-accent text-primary">
                عرض التقارير
              </Button>

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
                <p>عدد الخدمات المقدمة</p>
                <h4 className="text-accent font-bold ">34</h4>
              </div>

              <div className="flex self-end place-self-end mr-auto justify-center text-center gap-1 items-center border rounded-lg p-0.5 px-1">
                <p className="text-xs">100%</p>
                <ArrowDownRight className="text-red-500 h-3 w-3 font-bold" />
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
        </div>
      </div>

      <div className="mt-5  flex gap-5 w-full">
        <div className="w-10/12 ">
          <h5 className="text-primary-foreground my-5">
            ابدأ في إنشاء مستخدمين
          </h5>
          <div className="flex gap-3">
            <div className="bg-accent w-1/2 border p-3 rounded-lg flex">
              <div className="p-2 bg-primary border w-fit rounded-lg flex items-center justify-center">
                <UserRoundPlus className="h-6 w-6" />
              </div>
              <div onClick={()=>navigate("/cp/users/org/create-edit")} className="mx-2 cursor-pointer flex flex-col">
                <p className="text-primary font-bold text-base">
                  أضف مستخدم جديد
                </p>

                <p className="text-primary text-sm font-thin">
                  أضف بنفسك أو استورد من CSV
                </p>
              </div>
            </div>

            {/* <div className=" w-1/2 border p-3 rounded-lg flex">
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
            </div> */}
          </div>

          <div className="w-11/12 mx-auto">
            <h5 className="text-primary-foreground my-5">العملاء</h5>
            <Tabs defaultValue="overview" dir="rtl" className="w-full">
              <TabsList className="w-full border-b justify-start rounded-none gap-1 bg-primary">
                <TabsTrigger value="custom">مخصص</TabsTrigger>
                <TabsTrigger value="segment">شريحة</TabsTrigger>
                <TabsTrigger value="list">عرض القائمة</TabsTrigger>
                <TabsTrigger value="table">جدول</TabsTrigger>
                <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              </TabsList>

              <TabsContent value="custom">محتوى مخصص</TabsContent>
              <TabsContent value="segment">محتوى الشريحة</TabsContent>
              <TabsContent value="list">محتوى القائمة</TabsContent>
              <TabsContent value="table">محتوى الجدول</TabsContent>

              <TabsContent className="flex gap-4 pt-4" value="overview">
                <div className="flex justify-between border w-1/3 rounded-lg">
                  <div className="flex gap-2 flex-col p-2">
                    <img src={ActiveNow} className="w-12 h-12" />

                    <p className="text-base">نشط الآن</p>
                    <h4 className="text-primary-foreground">33</h4>
                  </div>

                  <div className="flex  flex-col justify-between items-center p-3 ">
                    <button className="text-primary-foreground/30 hover:text-primary-foreground cursor-pointer w-fit">
                      <EllipsisVertical className="h-5 w-5" />
                    </button>
                    <div className="flex gap-1 justify-center items-center border p-0.5 px-1 rounded-lg">
                      <p className="text-xs text-primary-foreground">33</p>
                      <ArrowUpRight className="w-3 h-3 text-accent font-bold " />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between border w-1/3 rounded-lg">
                  <div className="flex gap-2 flex-col p-2">
                    <img src={Members} className="w-12 h-12" />

                    <p className="text-base">الأعضاء</p>
                    <h4 className="text-primary-foreground">23</h4>
                  </div>

                  <div className="flex  flex-col justify-between items-center p-3 ">
                    <button className="text-primary-foreground/30 hover:text-primary-foreground cursor-pointer w-fit">
                      <EllipsisVertical className="h-5 w-5" />
                    </button>
                    <div className="flex gap-1 justify-center items-center border p-0.5 px-1 rounded-lg">
                      <p className="text-xs text-primary-foreground">100%</p>
                      <ArrowUpRight className="w-3 h-3 text-accent font-bold " />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between border w-1/3 rounded-lg">
                  <div className="flex gap-2 flex-col p-2">
                    <img src={TotalMembers} className="w-12 h-12" />

                    <p className="text-base">إجمالي الأعضاء</p>
                    <h4 className="text-primary-foreground">88</h4>
                  </div>

                  <div className="flex  flex-col justify-between items-center p-3 ">
                    <button className="text-primary-foreground/30 hover:text-primary-foreground cursor-pointer w-fit">
                      <EllipsisVertical className="h-5 w-5" />
                    </button>
                    <div className="flex gap-1 justify-center items-center border p-0.5 px-1 rounded-lg">
                      <p className="text-xs text-primary-foreground">58%</p>
                      <ArrowUpRight className="w-3 h-3 text-accent font-bold " />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="w-2/12 min-w-56 mt-12 flex flex-col">
          <p className="text-sm text-primary-foreground my-5">
            الجمعيات المضافة حديثاً
          </p>
          <div className="my-1 flex flex-col gap-2">
            {recentCharity.map((charity) => (
              <div key={charity.name} className="flex  flex-wrap gap-2">
                <img className="w-10 h-10" src={DefaultUserImg} alt="" />
                <div className="flex flex-col">
                  <p>{charity.name}</p>
                  <p className="text-primary-foreground/60">
                    عضو منذ {charity.month} 
                    {" "}
                    {charity.year}
                  </p>
                  <div className="flex gap-1">
                    {charity.tags.map((tag) => (
                      <div key={tag.name} className={`border rounded-xl p-0.5 px-1.5 text-xs ${tag.theme.bg} ${tag.theme.text} ${tag.theme.border}`}>
                        {tag.name}
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
