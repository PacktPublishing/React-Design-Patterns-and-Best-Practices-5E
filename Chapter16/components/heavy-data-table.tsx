export default function HeavyDataTable() {
  const data = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    value: Math.floor(Math.random() * 1000),
    status: ["Active", "Pending", "Completed"][Math.floor(Math.random() * 3)],
  }))

  return (
    <div className="bg-white p-8 rounded-b-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Data Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{row.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{row.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">${row.value}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
