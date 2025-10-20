export function ReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Reports</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Sales Report", "User Engagement", "Traffic Analysis", "Revenue Breakdown"].map((report, i) => (
            <div
              key={i}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
            >
              <h3 className="font-medium text-gray-900 mb-2">{report}</h3>
              <p className="text-sm text-gray-600">Click to view detailed {report.toLowerCase()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
