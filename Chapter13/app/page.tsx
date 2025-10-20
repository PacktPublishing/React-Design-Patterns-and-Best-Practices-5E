"use client"

import { Header } from "@/src/components/Header"
import { Navigation } from "@/src/components/Navigation"
import { LanguageSwitcher } from "@/src/components/LanguageSwitcher"
import { useTranslation } from "react-i18next"
import { PriceDisplay } from "@/src/components/PriceDisplay"
import { ActivityFeed } from "@/src/components/ActivityFeed"

export default function HomePage() {
  const { t } = useTranslation()

  const sampleActivities = [
    {
      id: "1",
      message: "New user registered",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: "2",
      message: "Product updated successfully",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    },
    {
      id: "3",
      message: "Payment received",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      <Header userName="Carlos" />
      <Navigation />

      <main className="container mx-auto px-6 py-12">
        <section className="mb-12">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl p-12">
            <h1 className="text-5xl font-bold mb-6">{t("home.hero.title")}</h1>
            <p className="text-xl text-indigo-100 mb-8">{t("home.hero.subtitle")}</p>
            <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors">
              {t("home.hero.cta")}
            </button>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Price Formatting Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-4">Product Price</h3>
              <PriceDisplay amount={1299.99} currency="USD" showChange changePercent={0.15} />
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-4">Monthly Revenue</h3>
              <PriceDisplay amount={45678.5} currency="EUR" showChange changePercent={-0.05} />
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-4">Total Sales</h3>
              <PriceDisplay amount={123456.78} currency="GBP" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <ActivityFeed activities={sampleActivities} />
        </section>
      </main>
    </div>
  )
}
