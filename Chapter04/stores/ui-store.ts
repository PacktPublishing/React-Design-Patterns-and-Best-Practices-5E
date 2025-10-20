// Zustand UI state store
import { create } from "zustand"

interface UIStore {
  sidebarOpen: boolean
  theme: "light" | "dark"
  toggleSidebar: () => void
  setTheme: (theme: "light" | "dark") => void
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: false,
  theme: "light",
  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    })),
  setTheme: (theme) => set({ theme }),
}))
