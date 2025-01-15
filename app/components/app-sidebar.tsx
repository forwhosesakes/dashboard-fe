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
    LogOut
  } from "lucide-react";
  import { toasts } from "~/lib/utils/toast";
import { useState } from "react";
  
  const navigation = [
    { name: "لوحة التحكم", icon: Home, href: "/dashboard" },
    { name: "المستخدمين", icon: Users, href: "/users" },
    { name: "التحليلات", icon: BarChart3, href: "/analytics" },
    { name: "الإعدادات", icon: Settings, href: "/settings" },
  ];
  
  interface AppLayoutProps {
    children: React.ReactNode;
  }
  
  export function AppLayout({ children }: AppLayoutProps) {
    const [toggle,setToggle]=useState(true)
    return (
      <SidebarProvider defaultOpen>
        <div className="flex min-h-screen">
          <Sidebar side="right" variant="floating" collapsible="icon">
            <SidebarHeader>
              <SidebarTrigger onClick={()=>{setToggle(!toggle)}} loading={false} />
              <div className={`flex ${toggle?"":"flex-col"} items-center `}>
                <div className={`h-8 w-8 rounded-full border ${toggle?"ml-2 ":"mb-2"} bg-primary/10`} />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">تشوكي</span>
                  <span className="text-xs text-muted-foreground">مدير كبير</span>
                </div>
              </div>
            </SidebarHeader>
  
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>القائمة الرئيسية</SidebarGroupLabel>
                <SidebarMenu>
                  {navigation.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.name}
                      >
                        <a href={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
  
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    variant="outline"
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={() => toasts.error({ message: "تم تسجيل الخروج" })}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>تسجيل الخروج</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
  
          <main className="flex-1 p-6">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">لوحة التحكم</h1>
            </div>
  
            <div className="mt-8">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }