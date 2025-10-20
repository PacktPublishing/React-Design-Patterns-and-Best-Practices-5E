import { MouseTrackerDemo } from "@/components/react19/mouse-tracker-demo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CacheSignalPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">cacheSignal: Fine-Grained Reactivity</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            cacheSignal enables fine-grained reactivity in React. Only components that subscribe to a signal re-render
            when it changes, while the rest of your application remains unaffected.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Mouse Tracker Example</CardTitle>
            <CardDescription>
              Move your mouse around. Notice how only the follower and display update, while the rest of the page
              remains static.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MouseTrackerDemo />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why Fine-Grained Reactivity?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Performance at Scale</h3>
              <p className="text-sm text-muted-foreground">
                When values change frequently (like mouse position, scroll position, or real-time data), traditional
                state management causes too many re-renders. Signals let you opt specific components into reactivity.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Inspired by Modern Frameworks</h3>
              <p className="text-sm text-muted-foreground">
                React borrows ideas from Solid, Vue, and Svelte's fine-grained reactivity systems while maintaining its
                core principles and component model.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
