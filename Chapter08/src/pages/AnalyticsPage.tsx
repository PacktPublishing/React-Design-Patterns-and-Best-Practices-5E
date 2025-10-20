import { useLoaderData } from "react-router-dom"
import type { AnalyticsData } from "../types"

function StatCard({ title, value, icon }: { title: string; value: string; icon: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center">
        <span className="text-2xl mr-3">{icon}</span>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

export function AnalyticsPage() {
  const { quickStats, chartData, reports } = useLoaderData() as AnalyticsData

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Visitors" value={quickStats.visitors.toLocaleString()} icon="👥" />
            <StatCard title="Page Views" value={quickStats.pageViews.toLocaleString()} icon="👁️" />
            <StatCard title="Bounce Rate" value={`${quickStats.bounceRate}%`} icon="📊" />
            <StatCard title="Avg. Session" value={quickStats.avgSession} icon="⏱️" />
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Traffic Analysis</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div className="h-64 bg-blue-50 rounded-lg flex items-center justify-center">
              <p className="text-blue-600">Traffic Chart Visualization</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Traffic Sources</h3>
                <div className="space-y-2">
                  {chartData.sources.map((source, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-green-700">{source.source}</span>
                      <span className="font-medium text-green-900">{source.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-900 mb-2">Trends</h3>
                <p className="text-purple-700">Traffic analysis would appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      report.status === "ready"
                        ? "bg-green-500"
                        : report.status === "processing"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  ></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{report.name}</h4>
                    <p className="text-sm text-gray-500">Updated {report.lastUpdated}</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  View Report
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
