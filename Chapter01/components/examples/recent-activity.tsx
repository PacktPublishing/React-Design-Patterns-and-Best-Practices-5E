import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"

type ActivityItem = {
  id: string
  description: string
  timestamp: string
}

async function fetchRecentActivity(): Promise<ActivityItem[]> {
  // Simulate database query
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return [
    { id: "1", description: "New order #1234", timestamp: "2 minutes ago" },
    { id: "2", description: "Customer registered", timestamp: "15 minutes ago" },
    { id: "3", description: "Product updated", timestamp: "1 hour ago" },
  ]
}

export default async function RecentActivity() {
  const activities = await fetchRecentActivity()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>Latest updates</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {activities.map((activity) => (
            <li key={activity.id} className="flex flex-col gap-1">
              <span className="text-sm">{activity.description}</span>
              <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
