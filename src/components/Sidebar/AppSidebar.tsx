import { Home, Bell, Truck, MapPin, Settings, User, Menu } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const sidebarItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Bell, label: "Notifications", path: "#" },
  { icon: Truck, label: "Fleet", path: "#" },
  { icon: MapPin, label: "Locations", path: "#" },
  { icon: Settings, label: "Settings", path: "#" },
]

export function AppSidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Sidebar className="w-16 bg-[#000000] border-r border-[#2a2a2a]" collapsible="none">
      <SidebarHeader className="p-0">
        <div className="flex items-center justify-center py-4">
          <Menu className="cursor-pointer" />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu className="">
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.path} className="p-0">
              <SidebarMenuButton
                onClick={() => navigate(item.path)}
                className={`w-12 cursor-pointer h-12 p-0 m-0 rounded-lg transition-colors flex items-center justify-center ${location.pathname === item.path || (location.pathname === "/" && item.path === "/charging-stations")
                  ? "bg-[#2a2a2a] text-white"
                  : "text-[#6b7280] hover:text-white hover:bg-[#2a2a2a]"
                  }`}
                tooltip={item.label}
              >
                <item.icon className="w-5 h-5" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="w-12 h-12 p-3 rounded-lg text-[#6b7280] hover:text-white hover:bg-[#2a2a2a] flex items-center justify-center"
              tooltip="Profile"
            >
              <User className="w-5 h-5 cursor-pointer" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
