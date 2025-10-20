// Error handling with use hook and Error Boundaries
"use client"

import { use, Suspense, Component, type ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class AsyncErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="destructive">
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>{this.state.error?.message}</AlertDescription>
        </Alert>
      )
    }
    return this.props.children
  }
}

function DataComponent({ dataPromise }: { dataPromise: Promise<any> }) {
  const data = use(dataPromise)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Loaded Successfully</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
      </CardContent>
    </Card>
  )
}

export function ErrorBoundaryExample() {
  const dataPromise = Promise.resolve({ message: "Success!", timestamp: new Date().toISOString() })

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Error Boundary Example</h2>
      <AsyncErrorBoundary>
        <Suspense fallback={<div className="text-muted-foreground">Loading...</div>}>
          <DataComponent dataPromise={dataPromise} />
        </Suspense>
      </AsyncErrorBoundary>
    </div>
  )
}
