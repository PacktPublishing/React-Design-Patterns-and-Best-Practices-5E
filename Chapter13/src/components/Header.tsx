"use client"

import { useTranslation } from "react-i18next"

interface HeaderProps {
  userName?: string
}

export function Header({ userName = "Guest" }: HeaderProps) {
  const { t } = useTranslation()

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t("welcome")}</h1>
          <p className="text-blue-100">{t("greeting", { name: userName })}</p>
        </div>
      </div>
    </header>
  )
}
