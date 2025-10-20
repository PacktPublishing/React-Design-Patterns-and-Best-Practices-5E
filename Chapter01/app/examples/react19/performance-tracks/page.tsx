import { CheckoutFormDemo } from "@/components/react19/checkout-form-demo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PerformanceTracksPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Performance Tracks</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Performance Tracks make performance monitoring a first-class part of your development workflow. Define
            critical user journeys and React automatically warns you when performance degrades.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Checkout Form with Performance Tracking</CardTitle>
            <CardDescription>
              This form tracks input performance and submission time. In development, React logs warnings when
              operations exceed thresholds.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CheckoutFormDemo />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Define Critical Journeys</h3>
              <p className="text-sm text-muted-foreground">
                Use defineTrack to specify user flows that must stay fast: checkout, search, navigation, form
                submission, etc.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Automatic Monitoring</h3>
              <p className="text-sm text-muted-foreground">
                React monitors these tracks and warns when interactions exceed your defined thresholds, helping you
                catch performance regressions early.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Production Analytics</h3>
              <p className="text-sm text-muted-foreground">
                In production, pipe this data to your analytics platform to monitor real-world performance and identify
                issues before users complain.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
