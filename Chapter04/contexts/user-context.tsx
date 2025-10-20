// Optimized Context API with separated state and actions
"use client"

import type React from "react"
import { createContext, useContext, useState, useMemo } from "react"
import type { User } from "@/types"

const UserContext = createContext<User | null>(null)
const UserActionsContext = createContext<{
  login: (user: User) => void
  logout: () => void
} | null>(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const actions = useMemo(
    () => ({
      login: (user: User) => setUser(user),
      logout: () => setUser(null),
    }),
    [],
  )

  return (
    <UserContext.Provider value={user}>
      <UserActionsContext.Provider value={actions}>{children}</UserActionsContext.Provider>
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}

export function useUserActions() {
  const actions = useContext(UserActionsContext)
  if (!actions) {
    throw new Error("useUserActions must be used within UserProvider")
  }
  return actions
}
