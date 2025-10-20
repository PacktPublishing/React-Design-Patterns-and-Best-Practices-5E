"use client"

import type React from "react"

import { useState, useCallback, memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react"

// Anti-pattern: Creating new functions on every render
interface ExpensiveChildBadProps {
  onClick: (id: string) => void
  data: string
}

let badRenderCount = 0

const ExpensiveChildBad = memo<ExpensiveChildBadProps>(({ onClick, data }) => {
  badRenderCount++
  console.log("ExpensiveChildBad rendered:", data)

  return (
    <div onClick={() => onClick(data)} className="p-4 border rounded cursor-pointer hover:bg-muted/50">
      <div className="font-semibold">{data}</div>
      <Badge variant="destructive" className="mt-2">
        Renders: {badRenderCount}
      </Badge>
    </div>
  )
})

ExpensiveChildBad.displayName = "ExpensiveChildBad"

const ParentComponentBad: React.FC = () => {
  const [items] = useState(["item1", "item2", "item3"])
  const [selectedItem, setSelectedItem] = useState<string>("")
  const [parentRenders, setParentRenders] = useState(0)

  const handleClick = (id: string) => {
    setSelectedItem(id)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button onClick={() => setParentRenders((p) => p + 1)}>Force Parent Re-render</Button>
        <Badge>Parent Renders: {parentRenders}</Badge>
      </div>
      <div className="text-sm text-muted-foreground">Selected: {selectedItem || "None"}</div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <ExpensiveChildBad
            key={item}
            data={item}
            // Creating new function on every render breaks memoization
            onClick={(id) => handleClick(id)}
          />
        ))}
      </div>
    </div>
  )
}

// Best practice: Properly memoized event handlers
interface OptimizedChildProps {
  data: string
  onSelect: (id: string) => void
}

let goodRenderCount = 0

const OptimizedChild = memo<OptimizedChildProps>(({ data, onSelect }) => {
  goodRenderCount++
  console.log("OptimizedChild rendered:", data)

  // Handle event binding inside the component
  const handleClick = useCallback(() => {
    onSelect(data)
  }, [data, onSelect])

  return (
    <div onClick={handleClick} className="p-4 border rounded cursor-pointer hover:bg-muted/50">
      <div className="font-semibold">{data}</div>
      <Badge variant="default" className="mt-2">
        Renders: {goodRenderCount}
      </Badge>
    </div>
  )
})

OptimizedChild.displayName = "OptimizedChild"

const ParentComponentGood: React.FC = () => {
  const [items] = useState(["item1", "item2", "item3"])
  const [selectedItem, setSelectedItem] = useState<string>("")
  const [parentRenders, setParentRenders] = useState(0)

  // Memoize the event handler
  const handleClick = useCallback((id: string) => {
    setSelectedItem(id)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button onClick={() => setParentRenders((p) => p + 1)}>Force Parent Re-render</Button>
        <Badge>Parent Renders: {parentRenders}</Badge>
      </div>
      <div className="text-sm text-muted-foreground">Selected: {selectedItem || "None"}</div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <OptimizedChild key={item} data={item} onSelect={handleClick} />
        ))}
      </div>
    </div>
  )
}

export default function EventHandlersPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Event Handler Performance</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Creating new function instances on every render leads to unnecessary re-renders in child components and
            memory overhead.
          </p>
        </div>

        <Tabs defaultValue="bad" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bad">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Anti-Pattern
            </TabsTrigger>
            <TabsTrigger value="good">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Best Practice
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bad">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="destructive">Anti-Pattern</Badge>
                  Inline Function Creation
                </CardTitle>
                <CardDescription>
                  Click "Force Parent Re-render" and watch all children re-render even though their data hasn't changed.
                  Check the console for render logs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ParentComponentBad />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="good">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="default">Best Practice</Badge>
                  Memoized Event Handlers
                </CardTitle>
                <CardDescription>
                  Click "Force Parent Re-render" and notice children don't re-render because the handler reference is
                  stable.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ParentComponentGood />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle>Key Takeaways</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>• Use useCallback to memoize event handlers passed to child components</p>
            <p>• Avoid inline arrow functions in JSX when passing to memoized children</p>
            <p>• React.memo only works if all props have stable references</p>
            <p>• setState functions are stable and don't need to be in dependencies</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
