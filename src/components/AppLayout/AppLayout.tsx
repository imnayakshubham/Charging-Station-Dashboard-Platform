import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { AppSidebar } from "../Sidebar/AppSidebar"
import { Header } from "../Dashboard/Header"

export function AppLayout() {

    return (
        <SidebarProvider>
            <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
                <AppSidebar />
                <SidebarInset className="flex-1 flex flex-col w-screen p-2" >
                    <Header />
                    <Outlet />
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
