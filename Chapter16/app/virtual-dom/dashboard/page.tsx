"use client"

import type React from "react"

import { useState, memo } from "react"

interface MetricCardProps {
  title: string
  value: number
  change: number
  icon: string
}

const MetricCard: React.FC<MetricCardProps> = memo(({ title, value, change, icon }) => {
  console.log(`Rendering: ${title}`)

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600 text-sm font-medium">{title}</span>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</div>
      <div className={`text-sm mt-2 ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
        {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% from last month
      </div>
    </div>
  )
})

MetricCard.displayName = "MetricCard"

export default function DashboardPage() {
  const [refreshCount, setRefreshCount] = useState(0)

  const metrics = [
    { title: "Total Users", value: 12543, change: 12.5, icon: "👥" },
    { title: "Revenue", value: 54320, change: 8.3, icon: "💰" },
    { title: "Active Sessions", value: 1834, change: -3.2, icon: "📊" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Dashboard - React.memo</h1>
        <p className="text-gray-600 mb-8">
          This example shows how React.memo prevents unnecessary re-renders. Check the console to see which components
          re-render when you click the refresh button.
        </p>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <button
            onClick={() => setRefreshCount((c) => c + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh {refreshCount}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">How React.memo works:</h3>
          <p className="text-sm text-gray-700">
            The MetricCard component is wrapped in React.memo, which tells React to skip re-rendering if the props
            haven't changed. When you click the refresh button, only the button's area re-renders—the metric cards
            remain untouched because their props are identical. Open the console to see the render logs.
          </p>
        </div>
      </div>
    </div>
  )
}
