import { ScenarioResults } from "./ScenarioResults"
import { ChartSection } from "./ChartSection"
import { KPISection } from "./KPISection"
import { Button } from "../ui/button"
import { RotateCw, Share, Zap } from "lucide-react"
import { useAppStore } from "@/store/useAppStore"
import { EditVariablesPanel } from "./EditVariablesPanel"

export function MainContent() {
    const openEditPanel = useAppStore((state) => state.openEditPanel)
    const isEditPanelOpen = useAppStore((state) => state.isEditPanelOpen)

    return (
        <>
            <div className="flex-1 overflow-auto p-6 space-y-6 bg-[#161618] border border-[#525252]">
                <div className="flex items-center justify-between px-6 py-4 flex-wrap gap-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8  rounded flex items-center justify-center">
                                <span className="text-black text-lg font-bold "><Zap className="text-[#ffffff] w-6 h-6" /></span>
                            </div>
                            <h1 className="text-2xl font-bold">Charging Station</h1>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-[#1a1a1a] border-[#3a3a3a] text-[#9ca3af] hover:bg-[#2a2a2a] hover:text-white"
                        >
                            <RotateCw className="w-4 h-4" />
                        </Button>
                        <Button
                            size="sm"
                            className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border border-[#4a4a4a]"
                            onClick={openEditPanel}
                        >
                            Edit Variables
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-[#1a1a1a] border-[#3a3a3a] text-[#9ca3af] hover:bg-[#2a2a2a] hover:text-white"
                        >
                            <Share className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <ScenarioResults />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <ChartSection />
                    </div>
                    <div>
                        <KPISection />
                    </div>
                </div>
            </div>
            {isEditPanelOpen && <EditVariablesPanel />}
        </>
    )
}
