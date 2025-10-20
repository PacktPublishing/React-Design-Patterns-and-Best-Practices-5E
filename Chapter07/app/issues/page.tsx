"use client"

import { type FC, useState, useEffect } from "react"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

type Issue = {
  number: number
  title: string
  state: string
}

const Issues: FC = () => {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get("https://api.github.com/repos/ContentPI/ContentPI/issues")
      .then((response: any) => {
        setIssues(response.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <Link href="/" className="inline-block mb-8 text-primary hover:underline">
          ← Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">ContentPI Issues</CardTitle>
              <CardDescription>Fetching data with useEffect Hook - Migrated from class component</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Loading issues...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {issues.map((issue: Issue) => (
                    <div key={issue.number} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <Badge variant="outline" className="mt-1">
                          #{issue.number}
                        </Badge>
                        <div className="flex-1">
                          <a
                            href={`https://github.com/ContentPI/ContentPI/issues/${issue.number}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-medium"
                          >
                            {issue.title}
                          </a>
                          <div className="mt-1">
                            <Badge variant={issue.state === "open" ? "default" : "secondary"}>{issue.state}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Migration Notes:</h3>
                <div className="text-sm space-y-2">
                  <p>✅ Replaced class component with functional component</p>
                  <p>✅ Replaced constructor and this.state with useState</p>
                  <p>✅ Replaced componentDidMount with useEffect</p>
                  <p>✅ Reduced code by ~10 lines</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Issues
