import { useState } from "react"
import { X, Search, Sparkles, ChevronDown, Plus, Info, Check, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAppStore } from "@/store/useAppStore"
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerClose,
} from "@/components/ui/drawer"
import { Card } from "../ui/card"

export function EditVariablesPanel() {
    const { filteredVariables, searchTerm, isEditPanelOpen, closeEditPanel, setSearchTerm, toggleVariable } = useAppStore()

    const [selectedVariable, setSelectedVariable] = useState<string | null>("co2-distribution")
    const [expandedSections, setExpandedSections] = useState({
        primary: false,
        secondary: false,
    })

    const toggleSection = (section: "primary" | "secondary") => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }))
    }


    const variableCategories = [
        {
            name: "Variable category 1",
            variables: filteredVariables.filter((v) => v.category === "Variable category 1"),
        },
        {
            name: "Variable Category 2",
            variables: filteredVariables.filter((v) => v.category === "Variable Category 2"),
        },
        {
            name: "Variable Category 3",
            variables: filteredVariables.filter((v) => v.category === "Variable Category 3"),
        },
    ]

    const selectedVariableData = filteredVariables.find((v) => v.id === selectedVariable)
    return (
        <Drawer open={isEditPanelOpen} onOpenChange={closeEditPanel} direction="right">
            <DrawerContent
                className="bg-[#0a0a0a] border-l border-[#2a2a2a] text-white w-full md:w-1/2 max-w-none h-full"
            >
                <DrawerHeader className="border-b border-[#2a2a2a]">
                    <div className="flex items-center justify-between">
                        <DrawerTitle className="text-xl font-semibold text-white">Edit Variables</DrawerTitle>
                        <DrawerClose asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#9ca3af] hover:text-white hover:bg-[#2a2a2a]"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </DrawerClose>
                    </div>
                </DrawerHeader>

                <div className="flex-1 flex gap-6 p-6 flex-col min-h-0 overflow-y-auto">
                    {/* Search and Actions */}
                    <div className="flex w-full gap-2 items-center border-b border-[#2a2a2a]">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6b7280] w-4 h-4" />
                            <Input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search..."
                                className="pl-10 bg-[#1a1a1a] border-[#3a3a3a] text-white placeholder-[#6b7280] focus:border-[#4a4a4a]"
                            />
                        </div>

                        <div className="flex space-x-2">
                            <Button size="sm" className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border border-[#4a4a4a]">
                                <Sparkles className="w-4 h-4 bg-[#2a2a2a]" />
                                Autofill
                            </Button>
                            <Button
                                size="sm"
                                className="flex items-center gap-2 px-6 py-2 border border-[#C8E972] bg-[rgba(205,255,80,0.08)] text-[#C8E972] font-semibold shadow-[0_0_8px_#C8E97233] hover:bg-[rgba(205,255,80,0.16)] transition"
                            >
                                <RotateCw className="w-5 h-5" />
                                Rerun
                            </Button>
                        </div>
                    </div>

                    <Card className="py-0 border-1 rounded-sm border-t border-r border-l border-b-0 border-solid border-[#525252]">
                        <div className="p-6 flex  flex-col gap-6">
                            {variableCategories.map((category, categoryIndex) => (
                                <div key={categoryIndex} className="space-y-3">
                                    <h3 className="text-sm font-medium text-[#9ca3af]">{category.name}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {category.variables.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center w-full py-6">
                                                <Info className="w-6 h-6 mb-2 text-[#6b7280] opacity-80" />
                                                <span className="text-[#6b7280] text-sm italic">No data</span>
                                            </div>
                                        ) : (
                                            category.variables.map((variable) => (
                                                <Button
                                                    variant="ghost"
                                                    key={variable.id}
                                                    className={`flex items-center gap-2 px-5 py-2 rounded-full border-2 transition font-semibold
                                                    ${variable.isActive
                                                            ? "border-[#C8E972] bg-[rgba(205,255,80,0.08)] text-[#C8E972]"
                                                            : "border-[#232323] bg-[#181818] text-[#9ca3af]"}
                                                `}
                                                    onClick={() => {
                                                        toggleVariable(variable.id)
                                                        setSelectedVariable(prev => {
                                                            return prev === variable.id ? null : variable.id
                                                        })
                                                    }}
                                                >
                                                    <span>{variable.name}</span>
                                                    <Sparkles className="w-4 h-4 color-[#C8E972]" />
                                                    {variable.isActive ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                                </Button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {selectedVariableData && (
                            <div className="p-4 bg-[#222324] border border-solid border-[#525252]">
                                <div className="flex items-center space-x-2 mb-3">
                                    <h3 className="font-medium text-white">{selectedVariableData.name}</h3>
                                    <div className="w-4 h-4 bg-[#3a3a3a] rounded-full flex items-center justify-center">
                                        <span className="text-xs text-[#9ca3af]">i</span>
                                    </div>
                                </div>
                                <p className="text-sm text-[#9ca3af] leading-relaxed">
                                    {selectedVariableData.description || "No description available for this variable."}
                                </p>
                            </div>
                        )}


                    </Card>

                    <div className="space-y-3">
                        <button
                            onClick={() => toggleSection("primary")}
                            className="w-full flex items-center justify-between p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-left hover:bg-[#2a2a2a] transition-colors"
                        >
                            <span className="text-[#84cc16] font-medium">Primary Variables</span>
                            <ChevronDown
                                className={`w-4 h-4 text-[#6b7280] transition-transform ${expandedSections.primary ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {expandedSections.primary && (
                            <div className="p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
                                <p className="text-sm text-[#9ca3af]">Primary variables content would go here...</p>
                            </div>
                        )}

                        <button
                            onClick={() => toggleSection("secondary")}
                            className="w-full flex items-center justify-between p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-left hover:bg-[#2a2a2a] transition-colors"
                        >
                            <span className="text-[#84cc16] font-medium">Secondary Variables</span>
                            <ChevronDown
                                className={`w-4 h-4 text-[#6b7280] transition-transform ${expandedSections.secondary ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {expandedSections.secondary && (
                            <div className="p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
                                <p className="text-sm text-[#9ca3af]">Secondary variables content would go here...</p>
                            </div>
                        )}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
