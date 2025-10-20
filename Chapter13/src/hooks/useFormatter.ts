"use client"

import { useTranslation } from "react-i18next"
import { useMemo } from "react"
import { LocaleFormatter } from "../utils/formatters"

export function useFormatter() {
  const { i18n } = useTranslation()

  return useMemo(() => new LocaleFormatter(i18n.language), [i18n.language])
}
