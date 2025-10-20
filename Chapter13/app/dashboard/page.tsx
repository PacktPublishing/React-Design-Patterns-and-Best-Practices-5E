"use client"

import { Header } from "@/src/components/Header"
import { Navigation } from "@/src/components/Navigation"
import { LanguageSwitcher } from "@/src/components/LanguageSwitcher"
import { ActionPanel } from "@/src/components/ActionPanel"
import { useTranslation } from "react-i18next"
import { useFormatter } from "@/src/hooks/useFormatter"
import { useState } from "react"

export default function DashboardPage() {
  const { t } = useTranslation()
  const formatter = useFormatter()
  const [isLoading, setIsLoading] = useState(false)

  const userData = {
    name: "Carlos",
    lastLogin: new Date(),
    stats: {
      views: 12847,
      sales: 24567.89,
      conversion: 0.034,
    },
  }

  const handleSave = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <Header userName={userData.name} />
      <Navigation />

      <main className="container mx-auto px-6 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t("dashboard.welcome", { name: userData.name })}</h1>
          <p className="text-gray-600 mt-2">
            {t("dashboard.lastLogin", {
              date: formatter.formatDate(userData.lastLogin, {
                dateStyle: "long",
                timeStyle: "short",
              }),
            })}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-2">{t("dashboard.stats.views")}</h3>
            <p className="text-3xl font-bold text-gray-900">{formatter.formatNumber(userData.stats.views)}</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-2">{t("dashboard.stats.sales")}</h3>
            <p className="text-3xl font-bold text-gray-900">{formatter.formatCurrency(userData.stats.sales, "USD")}</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-2">{t("dashboard.stats.conversion")}</h3>
            <p className="text-3xl font-bold text-gray-900">{formatter.formatPercent(userData.stats.conversion)}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t("dashboard.title")}</h2>
            <p className="text-gray-600">{t("dashboard.description")}</p>
          </div>

          <ActionPanel
            onSave={handleSave}
            onCancel={() => console.log("Cancel")}
            onDelete={() => console.log("Delete")}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  )
}
