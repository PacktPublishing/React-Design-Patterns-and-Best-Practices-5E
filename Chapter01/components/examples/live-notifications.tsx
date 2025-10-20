"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function LiveNotifications() {
  const [count, setCount] = useState(3)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Live Notifications
          <Badge variant="secondary">{count}</Badge>
        </CardTitle>
        <CardDescription>Real-time updates (Client Component)</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This component updates in real-time using client-side JavaScript.
        </p>
      </CardContent>
    </Card>
  )
}
