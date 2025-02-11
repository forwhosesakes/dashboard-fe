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
import { useNavigate } from "react-router";




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
          {/* <div className="relative w-2/5">
            <InputField placeholder="البحث..." className="w-full" />
            <div className="absolute left-2 text-primary-foreground/40 top-[6px]">
              <Search className="h-5 w-5" />
            </div>
          </div> */}

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
