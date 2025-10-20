"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock analytics object
const analytics = {
  track: (eventName: string, data: object) => {
    console.log(`[Analytics] ${eventName}:`, data)
  },
}

// Simulating useEffectEvent behavior (not available in React 19.1)
// In React 19.2, you would import this from 'react'
function useEffectEvent<T extends (...args: any[]) => any>(fn: T): T {
  const ref = useState({ fn })[0]
  ref.fn = fn
  return useState(
    () =>
      (...args: any[]) =>
        ref.fn(...args),
  )[0] as T
}

interface AnalyticsTrackerProps {
  userId: string
  pageName: string
}

function AnalyticsTracker({ userId, pageName }: AnalyticsTrackerProps) {
  const [sessionDuration, setSessionDuration] = useState(0)

  // This function always sees the latest userId and pageName
  // but doesn't cause effects to re-run when they change
  const logEvent = useEffectEvent((eventName: string, data: object) => {
    analytics.track(eventName, {
      userId,
      pageName,
      timestamp: Date.now(),
      ...data,
    })
  })

  // This effect only runs once on mount
  useEffect(() => {
    const startTime = Date.now()
    logEvent("page_view", { startTime })

    const interval = setInterval(() => {
      const duration = Math.floor((Date.now() - startTime) / 1000)
      setSessionDuration(duration)
      logEvent("heartbeat", { duration })
    }, 5000)

    return () => {
      const endTime = Date.now()
      const totalDuration = Math.floor((endTime - startTime) / 1000)
      logEvent("page_exit", { totalDuration })
      clearInterval(interval)
    }
  }, []) // Empty deps array - this really only runs once now

  return (
    <div className="fixed bottom-4 right-4 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm opacity-75">
      Session: {sessionDuration}s
    </div>
  )
}

export function AnalyticsTrackerDemo() {
  const [userId, setUserId] = useState("user-123")
  const [pageName, setPageName] = useState("Dashboard")

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="userId">User ID</Label>
          <Input id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pageName">Page Name</Label>
          <Input id="pageName" value={pageName} onChange={(e) => setPageName(e.target.value)} />
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground mb-2">
          Try changing the User ID or Page Name above. The analytics tracker will use the latest values without
          re-running the effect.
        </p>
        <p className="text-sm text-muted-foreground">Open your browser console to see the analytics events.</p>
      </div>

      <AnalyticsTracker userId={userId} pageName={pageName} />
    </div>
  )
}
