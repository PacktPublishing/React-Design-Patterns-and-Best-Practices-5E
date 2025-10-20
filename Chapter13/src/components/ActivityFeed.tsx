"use client"

import { useFormatter } from "../hooks/useFormatter"

interface Activity {
  id: string
  message: string
  timestamp: Date
}

interface ActivityFeedProps {
  activities: Activity[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const formatter = useFormatter()

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex-1">
            <p className="text-gray-900">{activity.message}</p>
            <time className="text-sm text-gray-500">{formatter.formatRelativeTime(activity.timestamp)}</time>
          </div>
        </div>
      ))}
    </div>
  )
}
