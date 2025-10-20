"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface DashboardData {
  metrics: Array<{
    id: string
    label: string
    value: string
  }>
}

async function fetchDashboardData(userId: string): Promise<DashboardData> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    metrics: [
      { id: "1", label: "Total Sales", value: "$" + Math.floor(Math.random() * 100000) },
      { id: "2", label: "Active Users", value: String(Math.floor(Math.random() * 10000)) },
      { id: "3", label: "Conversion Rate", value: (Math.random() * 10).toFixed(2) + "%" },
    ],
  }
}

export function ActivityDemo() {
  const [isPending, startTransition] = useTransition()
  const [data, setData] = useState<DashboardData>({
    metrics: [
      { id: "1", label: "Total Sales", value: "$45,231" },
      { id: "2", label: "Active Users", value: "2,345" },
      { id: "3", label: "Conversion Rate", value: "3.24%" },
    ],
  })

  const refreshData = () => {
    startTransition(async () => {
      const newData = await fetchDashboardData("user-123")
      setData(newData)
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Dashboard Metrics</h2>
        <Button onClick={refreshData} disabled={isPending} className="relative">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Refresh
        </Button>
      </div>

      {/* Activity component simulation - in React 19.2, this would use <Activity> */}
      <div className={`transition-opacity duration-200 ${isPending ? "opacity-50" : "opacity-100"}`}>
        <div className="grid grid-cols-3 gap-6">
          {data.metrics.map((metric) => (
            <div key={metric.id} className="bg-white p-6 rounded-xl shadow-sm border">
              <p className="text-sm text-slate-600 mb-2">{metric.label}</p>
              <p className="text-3xl font-bold text-slate-900">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      {isPending && (
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Loader2 className="h-3 w-3 animate-spin" />
          Updating dashboard data...
        </div>
      )}
    </div>
  )
}
