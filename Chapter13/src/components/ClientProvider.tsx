"use client"

import type React from "react"

import { I18nextProvider } from "react-i18next"
import i18n from "../i18n/config"
import { useEffect, useState } from "react"

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Wait for i18n to be initialized
    if (i18n.isInitialized) {
      setIsReady(true)
    } else {
      i18n.on("initialized", () => {
        setIsReady(true)
      })
    }
  }, [])

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    )
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
