import { MoreHorizontal, ChevronUp, Sparkles } from "lucide-react"
import { useAppStore } from "@/store/useAppStore"
import { cn } from "@/lib/utils"

export function ScenarioResults() {
    const { expandedScenarios, toggleScenario } = useAppStore()

    const scenarioItems = [
        {
            title:
                "The best found configuration based on profit is characterized by 11 zones (max) with charging stations and 48 total number of poles.",
            content:
                "Detailed analysis shows that this configuration maximizes revenue while maintaining operational efficiency. The 11-zone setup provides optimal coverage across high-demand areas, with each zone strategically positioned to serve the maximum number of potential customers. The 48 charging poles are distributed to minimize wait times and maximize utilization rates.",
        },
        {
            title:
                "The best found configuration based on satisfied demand is characterized by 11 zones (max) with charging stations and 48 total number of poles.",
            content:
                "This demand-optimized configuration prioritizes customer satisfaction and accessibility. The placement strategy focuses on reducing travel distances for users and ensuring availability during peak hours. The 48 poles are positioned to handle surge demand patterns while maintaining consistent service quality across all zones.",
        },
    ]

    return (
        <div className="overflow-hidden">
            <button
                onClick={() => toggleScenario(0)}
                className="w-full p-4 text-left hover:bg-[#2a2a2a] transition-colors border-b border-[#2a2a2a]"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Sparkles className="w-5 h-5 text-[#DCFF7FFD]" />
                        <h2 className="text-xl font-semibold text-[#84cc16]">Best Scenario Results</h2>
                    </div>
                    <ChevronUp
                        className={cn(
                            "w-6 h-6 text-[#84cc16] border border-solid border-[#84cc16] rounded-md transition-transform duration-200",
                            expandedScenarios.includes(0) ? "rotate-180" : ""
                        )}
                    />
                </div>
            </button>

            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    expandedScenarios.includes(0) ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0",
                )}
            >
                <div className="p-4 space-y-3">
                    {scenarioItems.map((item, index) => (
                        <div key={index} className=" border border-[#C9FF3B] overflow-hidden">
                            <div
                                className="w-full p-4 text-left hover:bg-[#1a1a1a] transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-[#C9FF3B] text-sm font-medium pr-4">{item.title}</p>
                                    <div className="flex items-center space-x-2 flex-shrink-0">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                            }}
                                            className="text-[#6b7280] hover:text-white"
                                        >
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={cn(
                                    "overflow-hidden transition-all duration-300 ease-in-out",
                                    expandedScenarios.includes(index + 1) ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                                )}
                            >
                                <div className="px-4 pb-4">
                                    <div className="border-t border-[#2a2a2a] pt-3">
                                        <p className="text-[#9ca3af] text-sm leading-relaxed">{item.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
