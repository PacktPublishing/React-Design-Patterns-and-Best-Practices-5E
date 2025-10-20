"use client"

import { useTranslation } from "react-i18next"
import { useEffect } from "react"

export function useDirection() {
  const { i18n } = useTranslation()
  const isRTL = i18n.dir() === "rtl"

  useEffect(() => {
    document.documentElement.dir = i18n.dir()
  }, [i18n.language])

  return {
    isRTL,
    direction: i18n.dir(),
    flipForRTL: (ltrValue: string, rtlValue: string) => (isRTL ? rtlValue : ltrValue),
  }
}
