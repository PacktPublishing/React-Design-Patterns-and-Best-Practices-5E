"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
type ThemeContextValue = {
  theme: Theme
  toggle: () => void
  set: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document !== "undefined") {
      if (document.documentElement.classList.contains("dark")) return "dark"
      if (document.documentElement.classList.contains("light")) return "light"
    }
    return "light"
  })

  useEffect(() => {
    // Always reset before applying
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)

    try {
      localStorage.setItem("theme", theme)
    } catch {}
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
        set: setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within ThemeProvider")
  return context
}
