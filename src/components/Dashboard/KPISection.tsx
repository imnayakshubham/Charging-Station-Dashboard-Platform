import { Info, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/store/useAppStore"

export function KPISection() {
    const kpis = useAppStore((state) => state.kpis)

    const kpiCards = [
        {
            title: "Infrastructure Units",
            value: `€${kpis.infrastructureUnits}`,
            description: "This describes variable two and what the shown data means.",
            icon: Info,
        },
        {
            title: "Charging Growth",
            value: kpis.chargingGrowth.toString(),
            description: "This describes variable two and what the shown data means.",
            icon: Info,
        },
        {
            title: "Localization change",
            value: `${kpis.localizationChange}%`,
            description: "This describes variable two and what the shown data means.",
            icon: Info,
        },
        {
            title: "Fleet growth",
            value: `${kpis.fleetGrowth}%`,
            description: "This describes variable two and what the shown data means.",
            icon: Info,
        },
    ]

    return (
        <div className="flex  flex-col gap-4">
            <div className="flex items-center justify-between ">
                <h2 className="text-[#FDFDFDFD] font-[Roobert\ TRIAL] font-semibold text-[24px] leading-[150%] tracking-[0%]">Key Performance Indicators</h2>
                <div className="flex items-center space-x-2">
                    <Button
                        size="sm"
                        variant="outline"
                        className="border-[1px] border-[#5A5A5AA1] bg-[#18181A80]"
                    >
                        <span className="text-sm">Variables</span>
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {kpiCards.map((kpi, index) => (
                    <Card key={index} className="bg-[#1a1a1a] border-[#2a2a2a] p-4 h-[200px] flex justify-between">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="font-inter font-medium text-xl leading-[100%] tracking-[-4%] text-[#FFFFFF]">{kpi.title}</h3>
                                <kpi.icon className="w-4 h-4 text-[#6b7280]" />
                            </div>
                            <div>
                                <p className="inline-block align-middle font-inter font-light text-[12px] leading-[150%] tracking-[0%] text-[#BBBBBB]">{kpi.description}</p>
                            </div>
                        </div>
                        <div>
                            <p className="font-[Roobert\ TRIAL] font-extrabold text-md md:text-2xl leading-[88%] tracking-[-2%] text-right align-middle">{kpi.value}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
