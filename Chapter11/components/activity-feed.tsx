interface ActivityFeedProps {
  activities: Array<{
    id: string
    type: string
    createdAt: string
    message?: string | null
  }>
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
            <div>
              <p className="text-sm font-medium text-gray-900">{activity.type}</p>
              {activity.message && <p className="text-sm text-gray-600">{activity.message}</p>}
              <p className="text-xs text-gray-400 mt-1">{new Date(activity.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
