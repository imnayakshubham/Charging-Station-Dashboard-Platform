import { Info } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useAppStore } from "@/store/useAppStore"

export function VariablesPanel() {
    const variables = useAppStore((state) => state.variables)
    const toggleVariable = useAppStore((state) => state.toggleVariable)

    return (
        <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
            <h3 className="text-sm font-medium text-[#9ca3af] mb-4">Variables</h3>
            <div className="space-y-3">
                {variables.slice(0, 6).map((variable) => (
                    <div
                        key={variable.id}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-[#2a2a2a] transition-colors cursor-pointer"
                        onClick={() => toggleVariable(variable.id)}
                    >
                        <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${variable.isActive ? "bg-[#84cc16]" : "bg-[#4a4a4a]"}`} />
                            <span className={`text-sm ${variable.isActive ? "text-white" : "text-[#6b7280]"}`}>{variable.name}</span>
                        </div>
                        <Info className="w-4 h-4 text-[#6b7280]" />
                    </div>
                ))}
            </div>
        </Card>
    )
}
