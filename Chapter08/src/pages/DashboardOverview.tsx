import { useLoaderData } from "react-router-dom"
import type { DashboardStats } from "../types"

export function DashboardOverview() {
  const { stats } = useLoaderData() as { stats: DashboardStats }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.users.toLocaleString()}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="font-medium text-green-900 mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-green-600">${stats.revenue.toLocaleString()}</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="font-medium text-purple-900 mb-2">Orders</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.orders.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Activity item {i}</span>
              </div>
              <span className="text-sm text-gray-500">{i} hours ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
