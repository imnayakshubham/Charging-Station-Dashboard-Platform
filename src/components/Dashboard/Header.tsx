import { Search } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"

const tabs = [
    { name: "Charging Stations", path: "/" },
    { name: "Fleet Sizing", path: "#" },
    { name: "Parking", path: "#" },
]

export function Header() {
    const navigate = useNavigate()
    const location = useLocation()

    const getCurrentTab = () => {
        if (location.pathname === "/") return "/"
        return location.pathname
    }

    return (
        <div className="border-b border-[#2a2a2a] bg-[#0a0a0a]">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-8">
                    <div className="flex space-x-1">
                        {tabs.map((tab) => (
                            <Button
                                variant={"ghost"}
                                key={tab.path}
                                onClick={() => navigate(tab.path)}
                                className={`bg-none outline-none  ${getCurrentTab() === tab.path
                                    ? "bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border border-[#4a4a4a]"
                                    : ""
                                    }`}
                            >
                                {tab.name}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6b7280] w-4 h-4" />
                        <Input
                            placeholder="Search"
                            className="pl-10 bg-[#1a1a1a] border-[#3a3a3a] text-white placeholder-[#6b7280] w-64 focus:border-[#4a4a4a]"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
