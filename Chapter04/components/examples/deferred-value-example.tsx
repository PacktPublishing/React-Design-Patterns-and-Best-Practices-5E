// useDeferredValue for performance optimization
"use client"

import { useDeferredValue, useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SearchResultsProps {
  query: string
  results: string[]
}

function SearchResults({ query, results }: SearchResultsProps) {
  const deferredQuery = useDeferredValue(query)
  const deferredResults = useDeferredValue(results)

  const filteredResults = useMemo(() => {
    return deferredResults.filter((result) => result.toLowerCase().includes(deferredQuery.toLowerCase()))
  }, [deferredQuery, deferredResults])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Results for: {deferredQuery || "All"}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {filteredResults.slice(0, 50).map((result, index) => (
            <li key={index} className="p-2 bg-muted rounded">
              {result}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export function DeferredValueExample() {
  const [query, setQuery] = useState("")
  const [results] = useState(() => Array.from({ length: 10000 }, (_, i) => `Result ${i + 1}`))

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">useDeferredValue Example</h2>
      <Input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
      <SearchResults query={query} results={results} />
    </div>
  )
}
