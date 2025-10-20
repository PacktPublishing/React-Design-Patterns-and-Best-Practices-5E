import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Simulated data fetching functions
async function fetchUserMetrics() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    score: 847,
    improvement: 12,
  }
}

async function fetchRecentActivity() {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return [
    { id: "1", description: "Completed tutorial" },
    { id: "2", description: "Earned achievement" },
    { id: "3", description: "Updated profile" },
  ]
}

async function fetchPersonalizedFeed() {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return [
    { id: "1", title: "New features available", content: "Check out what's new in the latest update." },
    { id: "2", title: "Your weekly summary", content: "Here's what you accomplished this week." },
  ]
}

// Server Components that fetch data
async function UserMetrics() {
  const metrics = await fetchUserMetrics()

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-sm font-medium text-slate-600 mb-2">Your Progress</h3>
      <p className="text-3xl font-bold text-slate-900">{metrics.score}</p>
      <p className="text-sm text-green-600 mt-1">+{metrics.improvement}% this week</p>
    </div>
  )
}

async function RecentActivity() {
  const activities = await fetchRecentActivity()

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-sm font-medium text-slate-600 mb-3">Recent Activity</h3>
      <div className="space-y-2">
        {activities.map((activity) => (
          <div key={activity.id} className="text-sm text-slate-700">
            • {activity.description}
          </div>
        ))}
      </div>
    </div>
  )
}

async function PersonalizedFeed() {
  const feed = await fetchPersonalizedFeed()

  return (
    <div className="space-y-4">
      {feed.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle className="text-lg">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{item.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Skeleton components
function MetricCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border animate-pulse">
      <div className="h-4 bg-slate-200 rounded w-1/2 mb-3"></div>
      <div className="h-8 bg-slate-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-slate-200 rounded w-1/3"></div>
    </div>
  )
}

function FeedSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <Card key={i}>
          <CardHeader>
            <div className="h-5 bg-slate-200 rounded w-1/3 animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Main page component - shell is pre-rendered, dynamic parts stream in
export default function PartialPrerenderPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Partial Pre-rendering (PPR)</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            PPR combines the best of static and dynamic rendering. The static shell is pre-rendered at build time and
            served instantly, while dynamic content streams in as it becomes available.
          </p>
        </div>

        {/* Static promotional card - pre-rendered at build time */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-xl text-white">
          <h2 className="text-2xl font-semibold mb-2">New Feature Available</h2>
          <p className="text-blue-100">Check out our latest updates and improvements to enhance your experience.</p>
        </div>

        {/* Dynamic content with Suspense boundaries */}
        <div className="grid md:grid-cols-2 gap-6">
          <Suspense fallback={<MetricCardSkeleton />}>
            <UserMetrics />
          </Suspense>

          <Suspense fallback={<MetricCardSkeleton />}>
            <RecentActivity />
          </Suspense>
        </div>

        <Suspense fallback={<FeedSkeleton />}>
          <PersonalizedFeed />
        </Suspense>

        <Card>
          <CardHeader>
            <CardTitle>How PPR Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Instant Shell</h3>
              <p className="text-sm text-muted-foreground">
                The page layout, navigation, and static content are pre-rendered at build time and served instantly from
                the CDN.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Streaming Dynamic Content</h3>
              <p className="text-sm text-muted-foreground">
                Components wrapped in Suspense boundaries are rendered on-demand, with content streaming in as it
                becomes available.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Progressive Enhancement</h3>
              <p className="text-sm text-muted-foreground">
                Users see immediate feedback (the shell) followed by progressive enhancement as personalized content
                loads. No more blank screens!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
