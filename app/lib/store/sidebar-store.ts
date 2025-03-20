import { create } from 'zustand';

interface SidebarState {
  isExpanded: boolean;
  toggleSidebar: () => void;
  setSidebarState: (isExpanded: boolean) => void;
  setSidebarOff:()=>void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isExpanded: true, // Default state
  toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
  setSidebarState: (isExpanded) => set({ isExpanded }),
  setSidebarOff:()=>set(()=>({isExpanded:false}))
}));