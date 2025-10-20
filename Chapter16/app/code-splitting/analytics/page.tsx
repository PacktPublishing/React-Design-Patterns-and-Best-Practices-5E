"use client"

import { lazy, Suspense, useState } from "react"

const HeavyChart = lazy(() => import("@/components/heavy-chart"))
const HeavyDataTable = lazy(() => import("@/components/heavy-data-table"))
const HeavyEditor = lazy(() => import("@/components/heavy-editor"))

type TabType = "overview" | "chart" | "data" | "editor"

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "chart", label: "Charts", icon: "📈" },
    { id: "data", label: "Data", icon: "📋" },
    { id: "editor", label: "Editor", icon: "✏️" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Analytics Dashboard - Code Splitting</h1>
        <p className="text-gray-600 mb-8">
          This example demonstrates lazy loading with React.lazy and Suspense. Heavy components only load when their
          tabs are clicked, reducing initial bundle size.
        </p>

        <div className="flex border-b mb-6 bg-white rounded-t-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <Suspense
          fallback={
            <div className="flex items-center justify-center h-96 bg-white rounded-b-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading content...</p>
              </div>
            </div>
          }
        >
          {activeTab === "overview" && (
            <div className="bg-white p-8 rounded-b-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Welcome to Analytics</h2>
              <p className="text-gray-600 mb-4">Select a tab to view detailed information.</p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold">45,231</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Conversions</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold">$12,345</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === "chart" && <HeavyChart />}
          {activeTab === "data" && <HeavyDataTable />}
          {activeTab === "editor" && <HeavyEditor />}
        </Suspense>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Code splitting benefits:</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Reduces initial bundle size by loading components on demand</li>
            <li>• Improves initial page load time</li>
            <li>• Users only download code for features they actually use</li>
            <li>• Suspense provides loading states while code downloads</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
