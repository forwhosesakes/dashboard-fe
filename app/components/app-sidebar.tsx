import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import {
  Home,
  Users,
  Settings,
  BarChart3,
  LogOut,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  BarChart4Icon,
  CopyCheck,
  Files,
  Shirt,
  Droplet,
  Baby,
  Command,
} from "lucide-react";
import Mosque from "~/assets/icons/mosque.svg";
import { toasts } from "~/lib/utils/toast";
import KidanLogo from "~/assets/images/logo.png";
import KidanLogomark from "~/assets/images/Logomark.png";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { UserSidebarCard } from "~/components/user-sidebar-card";

const generalNavigation = [
  { name: "لوحة التحكم", icon: Home, href: "/", isNested: true, stat: 10 },
  // {
  //   name: "لوحة البيانات",
  //   icon: BarChart4Icon,
  //   href: "/dashboard",
  //   isNested: true,
  // },
  { name: "المستخدمين", icon: Users, href: "/cp/users", isNested: false },
  // { name: "المستندات", icon: Files, href: "/documents", isNested: false },
  // { name: "الإعدادات", icon: Settings, href: "/settings", isNested: false },
  {name:"الأعضاء", icon:Users,href:"/cp/members",isNested:false}
];

const secondaryNavigation = [
  { name: "المهام", icon: CopyCheck, href: "/tasks", isNested: false, stat: 8 },
  {
    name: "المستخدمون",
    icon: Users,
    href: "/users",
    isNested: false,
    stat: 76,
  },
];

const categories = [
  { name: "رعاية المساجد", stat: 3 },
  { name: "رعاية الأيتام", icon: Baby, stat: 7 },
  // { name: "سقيا الماء", icon: Droplet, stat: 3 },
  // { name: "توزيع الملابس", icon: Shirt, stat: 4 },
];

interface AppLayoutProps {
  children: React.ReactNode;
  user: User;
}

export function AppLayout({ children, user }: AppLayoutProps) {
  const [toggle, setToggle] = useState(true);
  const location = useLocation();

  return (
    <SidebarProvider defaultOpen>
      <div className="flex  min-h-screen w-full h-full">
        <Sidebar side="right" variant="floating" collapsible="icon">
          <SidebarHeader
            className={`flex items-center ${
              toggle ? "flex-row" : "flex-col justify-center"
            }`}
          >
            <SidebarTrigger
              onClick={() => {
                setToggle(!toggle);
              }}
              loading={false}
              className="mt-2"
            />
            <Link className={`${toggle ? "w-1/2" : "w-10/12"} mt-2`} to={"/"}>
              <img src={toggle ? KidanLogo : KidanLogomark} />
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs text-primary-foreground/70">
                عام
              </SidebarGroupLabel>
              <SidebarMenu>
                {generalNavigation.map((item) => (
                  <SidebarMenuItem
                    key={item.href}
                    className="flex hover:bg-secondary/10 rounded-lg justify-center items-center"
                  >
                    <div
                      className={`${
                        location.pathname === item.href ? "" : "hidden"
                      } min-w-2 min-h-2 h-2 w-2 flex-shrink-0 rounded-full border bg-green-600`}
                    ></div>
                    <SidebarMenuButton className="" asChild tooltip={item.name}>
                      <Link to={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.stat && (
                      <span className="border text-xs py-[4px] px-[7px] rounded-2xl text-primary-foreground mx-2">
                        {item.stat}
                      </span>
                    )}
                    {item.isNested && (
                      <ChevronDown className="min-w-4 min-h-4 h-4 w-4 text-primary-foreground/60" />
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel> التصنيفات </SidebarGroupLabel>
              <SidebarMenu>
                {categories.map((item) => (
                  <SidebarMenuItem
                    key={item.name}
                    className="flex hover:bg-secondary/10 rounded-lg justify-center items-center"
                  >
                    {/* <div
                      className={`${
                        location.pathname === item.href ? "" : "hidden"
                      } min-w-2 min-h-2 h-2 w-2 flex-shrink-0 rounded-full border bg-green-600`}
                    ></div>    */}
                    <SidebarMenuButton className="" asChild tooltip={item.name}>
                      <Link to={"/"}>
                        {item.icon ? (
                          <item.icon className="h-4 w-4" />
                        ) : (
                          <img className="w-4 h-4" src={Mosque} />
                        )}

                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>

                    {/* {item.stat && (
                      <div className="border flex gap-[2px] text-xs py-[4px] px-[7px] rounded-2xl text-primary-foreground mx-2">
                        <p className="text-xs ">{item.stat}</p>
                        <Command className="w-3 h-3 my-auto " />
                      </div>
                    )} */}
                    <ChevronLeft className="min-w-4 min-h-4 h-4 w-4 text-primary-foreground/60" />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                {/* <SidebarMenuButton 
                    variant="outline"
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={() => toasts.error({ message: "تم تسجيل الخروج" })}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>تسجيل الخروج</span>
                  </SidebarMenuButton> */}
                {/* <div className="h-full w-full p-2 border rounded-lg relative">
                  <div className="absolute flex justify-center  h-6 w-6 rounded border left-2 top-2 hover:bg-secondary/10 transition-colors duration-300 cursor-pointer">
                    <div className="relative flex flex-col ">
                      <ChevronUp /> <ChevronDown />
                    </div>
                  </div>

                  <div
                    className={`flex ${toggle ? "" : "flex-col"} items-center `}
                  >
                    <div
                      className={`h-8 w-8 rounded-full border relative ${
                        toggle ? "ml-2 " : "mb-2"
                      } bg-primary`}
                    >
                      <div className="absolute bottom-0 -right-1 h-3 w-3 bg-green-500 rounded-full border" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div> */}
                <UserSidebarCard user={user} toggle={toggle} />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <main className=" p-5 w-full h-full min-h-screen">
          <div className="h-full w-full ">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
