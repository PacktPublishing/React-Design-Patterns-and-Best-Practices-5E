"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { preferenceManager } from "../services/userPreferences"

export function useUserPreferences() {
  const { i18n } = useTranslation()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    async function initializePreferences() {
      const preferences = await preferenceManager.loadPreferences()

      if (preferences?.language && preferences.language !== i18n.language) {
        await i18n.changeLanguage(preferences.language)
      }

      setIsInitialized(true)
    }

    initializePreferences()
  }, [i18n])

  const updateLanguage = async (language: string) => {
    await i18n.changeLanguage(language)
    await preferenceManager.savePreferences({ language })
  }

  return {
    isInitialized,
    updateLanguage,
    currentLanguage: i18n.language,
  }
}
