import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

type Stats = {
  revenue: number
  orders: number
  customers: number
}

async function fetchStats(): Promise<Stats> {
  // Simulate slow database query
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return {
    revenue: 45230,
    orders: 342,
    customers: 1205,
  }
}

export default async function DashboardStats() {
  const stats = await fetchStats()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Statistics
        </CardTitle>
        <CardDescription>Your business metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Revenue</span>
          <span className="text-2xl font-bold">${stats.revenue.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Orders</span>
          <span className="text-2xl font-bold">{stats.orders}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Customers</span>
          <span className="text-2xl font-bold">{stats.customers}</span>
        </div>
      </CardContent>
    </Card>
  )
}
