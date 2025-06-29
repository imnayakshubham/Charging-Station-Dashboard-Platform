import { create } from "zustand"
import { devtools } from "zustand/middleware"

// Types
export interface Variable {
  id: string
  name: string
  category: string
  isActive: boolean
  description?: string
  value?: number | string
}

export interface DataPoint {
  month: string
  value: number
  details: {
    profit: number
    demand: number
    efficiency: number
  }
}

export interface AppState {
  variables: Variable[]
  selectedVariables: string[]
  isEditPanelOpen: boolean
  hoveredDataPoint: DataPoint | null
  chartData: DataPoint[]
  searchTerm: string
  filteredVariables: Variable[]
  expandedScenarios: number[]
  kpis: {
    infrastructureUnits: number
    chargingGrowth: number
    localizationChange: number
    fleetGrowth: number
  }
}

export interface AppActions {
  toggleVariable: (variableId: string) => void
  openEditPanel: () => void
  closeEditPanel: () => void
  setHoveredDataPoint: (dataPoint: DataPoint | null) => void
  updateVariables: (variables: Variable[]) => void
  setSearchTerm: (searchTerm: string) => void
  toggleScenario: (index: number) => void
  resetFilters: () => void
}

const initialVariables: Variable[] = [
  {
    id: "carbon1",
    name: "Carbon 1",
    category: "Variable category 1",
    isActive: true,
    description: "Carbon emission tracking and optimization variable for environmental impact analysis.",
  },
  {
    id: "co2-distribution",
    name: "Co2 Distribution",
    category: "Variable category 1",
    isActive: true,
    description:
      "But what truly sets Switch apart is its versatility. It can be used as a scooter, a bike, or even a skateboard, making it suitable for people of all ages. Whether you're a student, a professional, or a senior citizen, Switch adapts to your needs and lifestyle.",
  },
  {
    id: "fleet-sizing",
    name: "Fleet sizing",
    category: "Variable category 1",
    isActive: true,
    description: "Optimal fleet size calculation based on demand patterns and operational efficiency.",
  },
  {
    id: "parking-rate",
    name: "Parking Rate",
    category: "Variable Category 2",
    isActive: false,
    description: "Parking utilization rates and pricing optimization for charging stations.",
  },
  {
    id: "border-rate",
    name: "Border Rate",
    category: "Variable Category 2",
    isActive: true,
    description: "Cross-border charging rate calculations and regulatory compliance metrics.",
  },
  {
    id: "request-rate",
    name: "Request rate",
    category: "Variable Category 2",
    isActive: true,
    description: "Customer request frequency and response time optimization parameters.",
  },
  {
    id: "variable-1-cat3",
    name: "Variable 1",
    category: "Variable Category 3",
    isActive: false,
    description: "General purpose variable for category 3 analysis and reporting.",
  },
  {
    id: "variable-2-cat3",
    name: "Variable 1",
    category: "Variable Category 3",
    isActive: true,
    description: "Secondary variable for advanced analytics in category 3.",
  },
  {
    id: "variable-3-cat3",
    name: "Variable 1",
    category: "Variable Category 3",
    isActive: true,
    description: "Tertiary variable for comprehensive category 3 data analysis.",
  },
]

const filterVariables = (variables: Variable[], searchTerm: string): Variable[] => {
  if (!searchTerm.trim()) return variables

  return variables.filter(
    (variable) =>
      variable.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variable.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      variable.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )
}

export const useAppStore = create<AppState & AppActions>()(
  devtools(
    (set, get) => ({
      // Initial state
      variables: initialVariables,
      selectedVariables: ["carbon1", "co2-distribution", "fleet-sizing"],
      isEditPanelOpen: false,
      hoveredDataPoint: null,
      searchTerm: "",
      filteredVariables: initialVariables,
      expandedScenarios: [0], // First scenario expanded by default
      chartData: [
        { month: "Apr", value: 35000, details: { profit: 35000, demand: 85, efficiency: 92 } },
        { month: "May", value: 55000, details: { profit: 55000, demand: 78, efficiency: 88 } },
        { month: "Jun", value: 45000, details: { profit: 45000, demand: 82, efficiency: 90 } },
        { month: "Jul", value: 95000, details: { profit: 95000, demand: 95, efficiency: 96 } },
        { month: "Aug", value: 65000, details: { profit: 65000, demand: 88, efficiency: 91 } },
        { month: "Sep", value: 35000, details: { profit: 35000, demand: 75, efficiency: 85 } },
        { month: "Oct", value: 60000, details: { profit: 60000, demand: 90, efficiency: 93 } },
      ],
      kpis: {
        infrastructureUnits: 421.07,
        chargingGrowth: 33.07,
        localizationChange: 21.9,
        fleetGrowth: 7.03,
      },

      toggleVariable: (variableId: string) => {
        set((state) => {
          const updatedVariables = state.variables.map((variable) =>
            variable.id === variableId ? { ...variable, isActive: !variable.isActive } : variable,
          )


          const toggledVariable = updatedVariables.find((v) => v.id === variableId)
          const updatedSelectedVariables = toggledVariable?.isActive
            ? [...state.selectedVariables, variableId]
            : state.selectedVariables.filter((id) => id !== variableId)

          return {
            variables: updatedVariables,
            selectedVariables: updatedSelectedVariables,
            filteredVariables: filterVariables(updatedVariables, state.searchTerm),
          }
        })
      },

      openEditPanel: () => set({ isEditPanelOpen: true }),

      closeEditPanel: () => set({ isEditPanelOpen: false }),

      setHoveredDataPoint: (dataPoint: DataPoint | null) => set({ hoveredDataPoint: dataPoint }),

      updateVariables: (variables: Variable[]) =>
        set((state) => ({
          variables,
          filteredVariables: filterVariables(variables, state.searchTerm),
        })),

      setSearchTerm: (searchTerm: string) =>
        set((state) => ({
          searchTerm,
          filteredVariables: filterVariables(state.variables, searchTerm),
        })),

      toggleScenario: (index: number) =>
        set((state) => ({
          expandedScenarios: state.expandedScenarios.includes(index)
            ? state.expandedScenarios.filter((i) => i !== index)
            : [...state.expandedScenarios, index],
        })),

      resetFilters: () =>
        set((state) => ({
          searchTerm: "",
          filteredVariables: state.variables,
        })),
    }),
    {
      name: "app-store",
    },
  ),
)
