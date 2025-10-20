// Zustand auth store with async operations
import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"
import type { User } from "@/types"

interface AuthStore {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  subscribeWithSelector((set) => ({
    user: null,
    isLoading: false,
    error: null,
    login: async (email, password) => {
      set({ isLoading: true, error: null })

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
          throw new Error("Invalid credentials")
        }

        const user = await response.json()
        set({ user, isLoading: false })
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : "Login failed",
          isLoading: false,
        })
      }
    },
    logout: () => {
      set({ user: null })
      fetch("/api/auth/logout", { method: "POST" })
    },
    checkAuth: async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const user = await response.json()
          set({ user })
        }
      } catch {
        // Silent fail - user not authenticated
      }
    },
  })),
)

// Selectors for fine-grained subscriptions
export const useUser = () => useAuthStore((state) => state.user)
export const useIsAuthenticated = () => useAuthStore((state) => !!state.user)
export const useAuthActions = () =>
  useAuthStore((state) => ({
    login: state.login,
    logout: state.logout,
    checkAuth: state.checkAuth,
  }))
