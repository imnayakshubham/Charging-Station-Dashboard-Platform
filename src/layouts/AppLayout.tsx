import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { AppSidebar } from "../components/Sidebar/AppSidebar"
import { Header } from "../components/Dashboard/Header"

export function AppLayout() {

    return (
        <SidebarProvider>
            <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
                <AppSidebar />
                <SidebarInset className="flex-1 flex flex-col w-screen p-2 overflow-y-scroll" >
                    <Header />
                    <Outlet />
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
