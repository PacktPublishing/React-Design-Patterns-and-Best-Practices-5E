import { AnalyticsTrackerDemo } from "@/components/react19/analytics-tracker-demo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EffectEventPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">useEffectEvent Hook</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            useEffectEvent solves the problem of effects that depend on functions which depend on props. It separates
            what changes from what reacts to changes, eliminating the need for complex useCallback chains.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Analytics Tracker Example</CardTitle>
            <CardDescription>
              This component tracks page views and session duration. Notice how the effect only runs once, but always
              has access to the latest props.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnalyticsTrackerDemo />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>The Problem It Solves</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Before useEffectEvent</h3>
              <p className="text-sm text-muted-foreground mb-2">
                You had to choose between correctness and performance:
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                <li>Include all dependencies: Effect re-runs too often</li>
                <li>Omit dependencies: Stale closures and bugs</li>
                <li>Use useCallback chains: Complex and hard to maintain</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">With useEffectEvent</h3>
              <p className="text-sm text-muted-foreground">
                The event function always sees the latest props and state, but doesn't cause the effect to re-run when
                they change. Clean dependency arrays with correct behavior.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
