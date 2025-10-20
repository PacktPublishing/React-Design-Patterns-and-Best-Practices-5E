import Link from "next/link"
import { Card } from "@/components/ui/card"

export default function Home() {
  const examples = [
    {
      title: "User Form",
      description: "Basic form with Server Actions",
      href: "/examples/user-form",
    },
    {
      title: "Profile Form",
      description: "Form with useFormStatus hook",
      href: "/examples/profile-form",
    },
    {
      title: "Comments",
      description: "Optimistic UI with useOptimistic",
      href: "/examples/comments",
    },
    {
      title: "Multi-Step Form",
      description: "Complex form with useActionState",
      href: "/examples/multi-step-form",
    },
    {
      title: "Products",
      description: "Server Components with caching",
      href: "/examples/products",
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">React 19 Actions & Server Interactions</h1>
        <p className="text-lg text-muted-foreground mb-12 text-center">
          Explore examples from the chapter on Actions, Server Interactions, and Caching
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {examples.map((example) => (
            <Link key={example.href} href={example.href}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <h2 className="text-xl font-semibold mb-2">{example.title}</h2>
                <p className="text-muted-foreground">{example.description}</p>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>
              Set up your database connection in <code className="bg-background px-2 py-1 rounded">.env</code>
            </li>
            <li>
              Run <code className="bg-background px-2 py-1 rounded">npx prisma migrate dev</code> to create tables
            </li>
            <li>Explore the examples above to see Actions in action</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
