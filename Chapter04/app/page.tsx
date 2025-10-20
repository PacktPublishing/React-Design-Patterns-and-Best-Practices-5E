"use client"
import { UseHookExample } from "@/components/examples/use-hook-example"
import { PostDetailExample } from "@/components/examples/post-detail-example"
import { ErrorBoundaryExample } from "@/components/examples/error-boundary-example"
import { DeferredValueExample } from "@/components/examples/deferred-value-example"
import { DataVisualizationExample } from "@/components/examples/data-visualization-example"
import { ResizableComponent } from "@/components/examples/resize-observer-example"
import { CartExample } from "@/components/examples/cart-example"
import { ThemeContextExample } from "@/components/examples/theme-context-example"
import { ThemeProvider } from "@/contexts/theme-context"
import { UserProvider } from "@/contexts/user-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <ThemeProvider>
      <UserProvider>
        <main className="container mx-auto py-8 px-4">
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold">Advanced State Management Techniques</h1>
              <p className="text-xl text-muted-foreground">React 19 State Management Examples</p>
            </div>

            <Tabs defaultValue="use-hook" className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
                <TabsTrigger value="use-hook">use Hook</TabsTrigger>
                <TabsTrigger value="async">Async</TabsTrigger>
                <TabsTrigger value="errors">Errors</TabsTrigger>
                <TabsTrigger value="deferred">Deferred</TabsTrigger>
                <TabsTrigger value="visualization">Charts</TabsTrigger>
                <TabsTrigger value="resize">Resize</TabsTrigger>
                <TabsTrigger value="cart">Cart</TabsTrigger>
                <TabsTrigger value="theme">Theme</TabsTrigger>
              </TabsList>

              <TabsContent value="use-hook" className="mt-6">
                <UseHookExample />
              </TabsContent>

              <TabsContent value="async" className="mt-6">
                <PostDetailExample />
              </TabsContent>

              <TabsContent value="errors" className="mt-6">
                <ErrorBoundaryExample />
              </TabsContent>

              <TabsContent value="deferred" className="mt-6">
                <DeferredValueExample />
              </TabsContent>

              <TabsContent value="visualization" className="mt-6">
                <DataVisualizationExample />
              </TabsContent>

              <TabsContent value="resize" className="mt-6">
                <ResizableComponent />
              </TabsContent>

              <TabsContent value="cart" className="mt-6">
                <CartExample />
              </TabsContent>

              <TabsContent value="theme" className="mt-6">
                <ThemeContextExample />
              </TabsContent>
            </Tabs>

            <div className="mt-12 p-6 bg-muted rounded-lg">
              <h2 className="text-2xl font-bold mb-4">About This Project</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>This project demonstrates advanced state management techniques from React 19, including:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    The revolutionary <code className="text-foreground">use</code> hook for async operations
                  </li>
                  <li>
                    <code className="text-foreground">useDeferredValue</code> for performance optimization
                  </li>
                  <li>Ref callbacks for cleanup and side effects</li>
                  <li>Redux Toolkit for complex state management</li>
                  <li>Context API patterns for theme and user management</li>
                  <li>Zustand for lightweight state management</li>
                  <li>Best practices for global and local state</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </UserProvider>
    </ThemeProvider>
  )
}
