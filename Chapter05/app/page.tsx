"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const antiPatterns = [
  {
    id: "state-props",
    title: "State Initialization from Props",
    description: "Initializing state directly from props without proper synchronization",
    path: "/examples/state-props",
  },
  {
    id: "global-state",
    title: "Overusing Global State",
    description: "Using global state for local UI concerns",
    path: "/examples/global-state",
  },
  {
    id: "state-mutation",
    title: "Direct State Mutation",
    description: "Mutating state directly instead of using immutable updates",
    path: "/examples/state-mutation",
  },
  {
    id: "keys",
    title: "Key and List Handling",
    description: "Using array indexes as keys in dynamic lists",
    path: "/examples/keys",
  },
  {
    id: "event-handlers",
    title: "Event Handler Performance",
    description: "Creating new function instances on every render",
    path: "/examples/event-handlers",
  },
  {
    id: "side-effects",
    title: "Side Effects Management",
    description: "Performing side effects incorrectly without cleanup",
    path: "/examples/side-effects",
  },
  {
    id: "prop-spreading",
    title: "Prop Spreading Security",
    description: "Spreading props directly onto DOM elements",
    path: "/examples/prop-spreading",
  },
  {
    id: "context-overuse",
    title: "Context API Overuse",
    description: "Using Context API leading to unnecessary renders",
    path: "/examples/context-overuse",
  },
  {
    id: "memoization",
    title: "Memoization Strategies",
    description: "Missing memoization for expensive computations",
    path: "/examples/memoization",
  },
  {
    id: "virtual-scroll",
    title: "Virtual Scrolling",
    description: "Rendering large lists without virtualization",
    path: "/examples/virtual-scroll",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-balance">React Anti-Patterns & Best Practices</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
            Learn to identify and avoid common React anti-patterns through interactive examples comparing problematic
            code with best practice solutions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {antiPatterns.map((pattern) => (
            <Link key={pattern.id} href={pattern.path}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer hover:border-primary">
                <CardHeader>
                  <CardTitle className="text-lg">{pattern.title}</CardTitle>
                  <CardDescription className="text-sm">{pattern.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline">Interactive Example</Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>About This Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This interactive learning application demonstrates the most prevalent anti-patterns in React development.
              Each example shows both the problematic approach and the correct implementation, helping you understand
              not just what to avoid, but why these patterns are problematic.
            </p>
            <div className="flex gap-2 flex-wrap">
              <Badge>React 18+</Badge>
              <Badge>TypeScript</Badge>
              <Badge>Next.js</Badge>
              <Badge>Tailwind CSS</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
