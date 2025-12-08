import { create } from 'zustand';

interface GraphSettings {
    showLabels: boolean;
    showDirectionality: boolean;
    nodeSize: number;
    linkThickness: number;
}

interface FilterCriteria {
    groups: string[];
    tags: string[];
    searchTerm: string;
}

interface GraphState {
    selectedNodeId: string | null;
    isSidebarOpen: boolean;
    filterCriteria: FilterCriteria;
    graphSettings: GraphSettings;
    
    // Actions
    setSelectedNodeId: (id: string | null) => void;
    setSidebarOpen: (isOpen: boolean) => void;
    setFilterCriteria: (criteria: Partial<FilterCriteria>) => void;
    setGraphSettings: (settings: Partial<GraphSettings>) => void;
    resetFilters: () => void;
}

const defaultFilterCriteria: FilterCriteria = {
    groups: [],
    tags: [],
    searchTerm: '',
};

const defaultGraphSettings: GraphSettings = {
    showLabels: true,
    showDirectionality: true,
    nodeSize: 5,
    linkThickness: 1,
};

export const useGraphStore = create<GraphState>((set) => ({
    selectedNodeId: null,
    isSidebarOpen: false,
    filterCriteria: defaultFilterCriteria,
    graphSettings: defaultGraphSettings,

    setSelectedNodeId: (id) => set({ selectedNodeId: id }),
    setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
    setFilterCriteria: (criteria) => 
        set((state) => ({
            filterCriteria: { ...state.filterCriteria, ...criteria },
        })),
    setGraphSettings: (settings) =>
        set((state) => ({
            graphSettings: { ...state.graphSettings, ...settings },
        })),
    resetFilters: () => set({ filterCriteria: defaultFilterCriteria }),
}));