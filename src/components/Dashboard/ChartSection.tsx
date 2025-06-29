import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useAppStore } from "@/store/useAppStore"
import { LineChart } from "./LineChart"

export function ChartSection() {
    const chartData = useAppStore((state) => state.chartData)
    const [selectedMetric, setSelectedMetric] = useState("Unsatisfied Demand %")

    return (
        <div className="space-y-4 ">
            <h2 className="text-xl font-semibold text-white">Graphs</h2>

            <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6 h-full">
                <div className="flex justify-end">
                    <div className="relative">
                        <select
                            value={selectedMetric}
                            onChange={(e) => setSelectedMetric(e.target.value)}
                            className="bg-[#18181A80] border border-[#5A5A5AA1] rounded-sm px-4 py-2 text-white appearance-none pr-10 text-sm focus:border-[#4a4a4a] focus:outline-none"
                        >
                            <option>Unsatisfied Demand %</option>
                            <option>Profit Margin</option>
                            <option>Efficiency Rate</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#fff] pointer-events-none" />
                    </div>
                </div>

                <div className="h-[20rem]">
                    <LineChart data={chartData} />
                </div>
            </Card >
        </div >
    )
}
