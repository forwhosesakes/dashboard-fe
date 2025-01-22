import * as React from "react"
import { LogOut, User, UserCog, Users, ChevronUp, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown"

interface UserDropdownProps {
  user: User;
  toggle?: boolean;  // For sidebar collapsed state
}

export function UserSidebarCard({ user, toggle = true }: UserDropdownProps) {
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <div className="h-full w-full p-2 border rounded-lg relative cursor-pointer">
          <div className="absolute flex justify-center h-6 w-6 rounded border left-2 top-2 hover:bg-secondary/10 transition-colors duration-300">
            <div className="relative flex flex-col">
              <ChevronUp className="h-3 w-3" /> 
              <ChevronDown className="h-3 w-3" />
            </div>
          </div>

          <div className={`flex ${toggle ? "" : "flex-col"} items-center`}>
            <div className={`h-8 w-8 rounded-full border relative ${
              toggle ? "ml-2" : "mb-2"
            } bg-primary`}>
              <div className="absolute bottom-0 -right-1 h-3 w-3 bg-green-500 rounded-full border" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground">
                {user?.role}
              </span>
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>حسابي</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem>
          <User className="ml-2 h-4 w-4" />
          <span>الملف الشخصي</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <UserCog className="ml-2 h-4 w-4" />
          <span>إعدادات الحساب</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Users className="ml-2 h-4 w-4" />
          <span>تبديل الحساب</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="text-destructive">
          <LogOut className="ml-2 h-4 w-4" />
          <span>تسجيل الخروج</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}