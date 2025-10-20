"use client"

import type React from "react"
import { useTheme } from "@/contexts/theme-provider"

const ThemeSwitcher: React.FC = () => {
  const { theme, set } = useTheme()

  const themes = [
    { key: "light" as const, label: "Light", icon: "☀️" },
    { key: "dark" as const, label: "Dark", icon: "🌙" },
  ]

  return (
    <div className="relative inline-block">
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 space-x-1">
        {themes.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => set(key)}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${
                theme === key
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50"
              }
            `}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ThemeSwitcher
