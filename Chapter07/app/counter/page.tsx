"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Operation = "add" | "subtract"

export default function CounterPage() {
  const [counter, setCounter] = useState<number>(0)

  const handleCounter = (operation: Operation) => {
    if (operation === "add") {
      return setCounter(counter + 1)
    }

    setCounter(counter - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <Link href="/" className="inline-block mb-8 text-primary hover:underline">
          ← Back to Home
        </Link>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Counter Example</CardTitle>
              <CardDescription>Demonstrating the useState Hook with a simple counter</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-6xl font-bold text-primary mb-8">{counter}</p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => handleCounter("add")} size="lg" className="text-lg px-8">
                    + Add
                  </Button>
                  <Button
                    onClick={() => handleCounter("subtract")}
                    size="lg"
                    variant="secondary"
                    className="text-lg px-8"
                  >
                    - Subtract
                  </Button>
                </div>
              </div>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Code Explanation:</h3>
                <pre className="text-sm overflow-x-auto">
                  {`const [counter, setCounter] = useState<number>(0)

const handleCounter = (operation: Operation) => {
  if (operation === 'add') {
    return setCounter(counter + 1)
  }
  setCounter(counter - 1)
}`}
                </pre>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Key Concepts:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>useState returns a state value and a setter function</li>
                  <li>TypeScript type annotation ensures type safety</li>
                  <li>Initial value is set to 0</li>
                  <li>State updates trigger component re-renders</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
