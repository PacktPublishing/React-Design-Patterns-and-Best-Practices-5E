import { Suspense } from "react"
import DashboardStats from "@/components/examples/dashboard-stats"
import RecentActivity from "@/components/examples/recent-activity"
import LiveNotifications from "@/components/examples/live-notifications"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

function StatsLoading() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Demonstrating streaming with Suspense boundaries for progressive loading
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<StatsLoading />}>
            <DashboardStats />
          </Suspense>

          <Suspense fallback={<StatsLoading />}>
            <RecentActivity />
          </Suspense>

          <LiveNotifications />
        </div>
      </div>
    </div>
  )
}
