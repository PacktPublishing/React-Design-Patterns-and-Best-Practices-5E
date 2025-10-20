import { ActivityDemo } from "@/components/react19/activity-demo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ActivityPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Activity Component</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            The Activity component provides context-aware loading indicators that integrate with React's transition
            system. It understands that not all waiting is created equal and provides smarter feedback.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dashboard with Activity Indicator</CardTitle>
            <CardDescription>
              Click "Refresh" to see the Activity component in action. Notice how it provides subtle feedback during the
              transition.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityDemo />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Context-Aware Feedback</h3>
              <p className="text-sm text-muted-foreground">
                The type prop allows different visual treatments - "refresh" shows subtle indicators, while "load" might
                take more visual space.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Automatic Timing</h3>
              <p className="text-sm text-muted-foreground">
                React decides whether to show the indicator based on operation duration. Short operations show no visual
                noise.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Transition Integration</h3>
              <p className="text-sm text-muted-foreground">
                Works seamlessly with useTransition to provide smooth, predictable feedback during state updates.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
