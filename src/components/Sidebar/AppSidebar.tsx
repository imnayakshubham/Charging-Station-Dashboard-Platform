import { Home, Bell, Truck, MapPin, Settings, User, Menu, LogOut } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { useClerk, useUser } from "@clerk/clerk-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const sidebarItems = [
  { icon: Home, label: "Home", path: "/dashboard" },
  { icon: Bell, label: "Notifications", path: "#" },
  { icon: Truck, label: "Fleet", path: "#" },
  { icon: MapPin, label: "Locations", path: "#" },
  { icon: Settings, label: "Settings", path: "#" },
]

export function AppSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signOut } = useClerk()
  const { user } = useUser()

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/sign-in')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className="w-12 h-12 p-3 rounded-lg text-[#6b7280] hover:text-white hover:bg-[#2a2a2a] flex items-center justify-center"
                  tooltip="Profile"
                >
                  <User className="w-5 h-5 cursor-pointer" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-[#23291E] border-[#C8E972] text-white"
                align="end"
                side="right"
              >
                <DropdownMenuItem className="text-sm text-gray-400 cursor-default">
                  <div className="flex flex-col">
                    <span className="font-medium text-white">{user?.firstName} {user?.lastName}</span>
                    <span className="text-xs">{user?.emailAddresses[0]?.emailAddress}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#C8E972]" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-[#C8E972] hover:bg-[#C8E972] hover:text-[#23291E] cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
