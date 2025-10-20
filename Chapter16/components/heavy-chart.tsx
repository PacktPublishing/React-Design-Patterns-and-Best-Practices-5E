export default function HeavyChart() {
  // Simulate a heavy component
  const data = Array.from({ length: 50 }, (_, i) => ({
    label: `Point ${i}`,
    value: Math.random() * 100,
  }))

  return (
    <div className="bg-white p-8 rounded-b-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Chart View</h2>
      <div className="space-y-2">
        {data.map((point, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-sm text-gray-600 w-20">{point.label}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-4">
              <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${point.value}%` }} />
            </div>
            <span className="text-sm font-medium w-12">{point.value.toFixed(0)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
