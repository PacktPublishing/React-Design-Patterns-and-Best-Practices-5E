import DataChart from "@/components/examples/data-chart"

export default function ChartsPage() {
  const sampleData = [
    { month: "Jan", value: 4000 },
    { month: "Feb", value: 3000 },
    { month: "Mar", value: 5000 },
    { month: "Apr", value: 4500 },
    { month: "May", value: 6000 },
    { month: "Jun", value: 5500 },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Data Visualization</h1>
        <p className="text-muted-foreground mb-8">Server-side chart generation - heavy libraries stay on the server</p>
        <DataChart data={sampleData} />
      </div>
    </div>
  )
}
