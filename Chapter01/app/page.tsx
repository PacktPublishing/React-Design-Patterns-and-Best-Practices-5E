import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HomePage() {
  const rscExamples = [
    {
      title: "User Profile Examples",
      description: "Compare Client vs Server Component implementations",
      href: "/examples/user-profile",
    },
    {
      title: "Blog Posts",
      description: "Server Component with data fetching",
      href: "/examples/posts",
    },
    {
      title: "Contact Form",
      description: "Server Actions for form submission",
      href: "/examples/contact",
    },
    {
      title: "Product Page",
      description: "Hybrid Server/Client Components with interactivity",
      href: "/examples/products/1",
    },
    {
      title: "Dashboard",
      description: "Streaming with Suspense boundaries",
      href: "/examples/dashboard",
    },
    {
      title: "Data Visualization",
      description: "Server-side chart generation",
      href: "/examples/charts",
    },
  ]

  const react19Examples = [
    {
      title: "Activity Component",
      description: "Context-aware loading indicators with transitions",
      href: "/examples/react19/activity",
    },
    {
      title: "useEffectEvent Hook",
      description: "Access latest props without effect re-runs",
      href: "/examples/react19/effect-event",
    },
    {
      title: "cacheSignal",
      description: "Fine-grained reactivity for specific updates",
      href: "/examples/react19/cache-signal",
    },
    {
      title: "Performance Tracks",
      description: "Profiling critical user journeys",
      href: "/examples/react19/performance-tracks",
    },
    {
      title: "Partial Pre-rendering",
      description: "Mix static and dynamic content efficiently",
      href: "/examples/react19/partial-prerender",
    },
    {
      title: "useId Improvements",
      description: "Better collision-resistant ID generation",
      href: "/examples/react19/use-id",
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-balance">Mastering React Server Components</h1>
        <p className="text-lg text-muted-foreground mb-12 text-pretty">
          Explore practical examples demonstrating React Server Components, React 19.2 features, data fetching,
          streaming, and performance optimization.
        </p>

        <Tabs defaultValue="rsc" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="rsc">RSC Examples</TabsTrigger>
            <TabsTrigger value="react19">React 19.2 Features</TabsTrigger>
          </TabsList>

          <TabsContent value="rsc">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rscExamples.map((example) => (
                <Link key={example.href} href={example.href}>
                  <Card className="h-full transition-colors hover:bg-accent">
                    <CardHeader>
                      <CardTitle>{example.title}</CardTitle>
                      <CardDescription>{example.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="react19">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {react19Examples.map((example) => (
                <Link key={example.href} href={example.href}>
                  <Card className="h-full transition-colors hover:bg-accent">
                    <CardHeader>
                      <CardTitle>{example.title}</CardTitle>
                      <CardDescription>{example.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
