// Advanced performance patterns with useDeferredValue
"use client"

import { useDeferredValue, useState, useMemo } from "react"
import type { DataPoint } from "@/types"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartProps {
  data: DataPoint[]
  filterCategory: string
  sortBy: "value" | "timestamp"
}

function ExpensiveChart({ data, filterCategory, sortBy }: ChartProps) {
  const deferredData = useDeferredValue(data)
  const deferredFilterCategory = useDeferredValue(filterCategory)
  const deferredSortBy = useDeferredValue(sortBy)

  const processedData = useMemo(() => {
    let filtered = deferredData

    if (deferredFilterCategory) {
      filtered = filtered.filter((point) => point.category.toLowerCase().includes(deferredFilterCategory.toLowerCase()))
    }

    return filtered.sort((a, b) => {
      if (deferredSortBy === "value") {
        return b.value - a.value
      }
      return b.timestamp.getTime() - a.timestamp.getTime()
    })
  }, [deferredData, deferredFilterCategory, deferredSortBy])

  const chartStats = useMemo(() => {
    return {
      total: processedData.length,
      average: processedData.reduce((sum, point) => sum + point.value, 0) / processedData.length,
      max: Math.max(...processedData.map((point) => point.value)),
      min: Math.min(...processedData.map((point) => point.value)),
    }
  }, [processedData])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold">{chartStats.total}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Average</p>
            <p className="text-2xl font-bold">{chartStats.average.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Max</p>
            <p className="text-2xl font-bold">{chartStats.max}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Min</p>
            <p className="text-2xl font-bold">{chartStats.min}</p>
          </div>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {processedData.slice(0, 100).map((point) => (
            <div key={point.id} className="flex justify-between p-2 bg-muted rounded">
              <span>{point.category}</span>
              <span className="font-mono">{point.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function DataVisualizationExample() {
  const [filterCategory, setFilterCategory] = useState("")
  const [sortBy, setSortBy] = useState<"value" | "timestamp">("value")

  const data = useMemo(() => {
    return Array.from({ length: 50000 }, (_, i) => ({
      id: i,
      value: Math.random() * 1000,
      category: `Category ${Math.floor(Math.random() * 10)}`,
      timestamp: new Date(Date.now() - Math.random() * 1000000000),
    }))
  }, [])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Data Visualization with useDeferredValue</h2>
      <div className="flex gap-4">
        <Input
          type="text"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          placeholder="Filter by category..."
          className="flex-1"
        />
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as "value" | "timestamp")}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="value">Sort by Value</SelectItem>
            <SelectItem value="timestamp">Sort by Timestamp</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ExpensiveChart data={data} filterCategory={filterCategory} sortBy={sortBy} />
    </div>
  )
}
