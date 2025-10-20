// Modern Context API pattern for theme management
"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useMemo } from "react"

interface ThemeColors {
  primary: string
  secondary: string
  background: string
  text: string
}

interface ThemeContextValue {
  colors: ThemeColors
  mode: "light" | "dark"
  setMode: (mode: "light" | "dark") => void
  toggleMode: () => void
}

const themes = {
  light: {
    primary: "#3b82f6",
    secondary: "#8b5cf6",
    background: "#ffffff",
    text: "#1f2937",
  },
  dark: {
    primary: "#60a5fa",
    secondary: "#a78bfa",
    background: "#1f2937",
    text: "#f3f4f6",
  },
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light")

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"))
  }, [])

  const value = useMemo(
    () => ({
      colors: themes[mode],
      mode,
      setMode,
      toggleMode,
    }),
    [mode, toggleMode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
