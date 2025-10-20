"use client"

import type React from "react"

import { useState, useContext, createContext, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react"

// Anti-pattern: Using global state for local UI state
interface GlobalUIState {
  isModalOpen: boolean
  selectedTab: string
  searchQuery: string
}

const UIContext = createContext<{
  state: GlobalUIState
  setState: React.Dispatch<React.SetStateAction<GlobalUIState>>
} | null>(null)

const BadModalComponent: React.FC = () => {
  const context = useContext(UIContext)
  if (!context) throw new Error("UIContext required")

  const { state, setState } = context

  return (
    <div className="space-y-4">
      <Button onClick={() => setState((prev) => ({ ...prev, isModalOpen: true }))}>
        Open Modal (Causes Global Re-renders)
      </Button>
      {state.isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg shadow-lg max-w-md">
            <h3 className="text-lg font-semibold mb-4">Modal</h3>
            <p className="text-muted-foreground mb-4">
              This modal state is in global context, causing unnecessary re-renders.
            </p>
            <Button onClick={() => setState((prev) => ({ ...prev, isModalOpen: false }))}>Close</Button>
          </div>
        </div>
      )}
    </div>
  )
}

const BadRenderCounter: React.FC = () => {
  const context = useContext(UIContext)
  const [renderCount, setRenderCount] = useState(0)

  // This increments on every render
  useMemo(() => {
    setRenderCount((prev) => prev + 1)
  }, [context])

  return <Badge variant="destructive">Unnecessary Renders: {renderCount}</Badge>
}

// Best practice: Keep local state local
const GoodModalComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-4">
      <Button onClick={() => setIsOpen(true)}>Open Modal (Local State)</Button>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg shadow-lg max-w-md">
            <h3 className="text-lg font-semibold mb-4">Modal</h3>
            <p className="text-muted-foreground mb-4">
              This modal uses local state, preventing unnecessary re-renders elsewhere.
            </p>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  )
}

const GoodRenderCounter: React.FC = () => {
  const [renderCount, setRenderCount] = useState(1)

  return <Badge variant="default">Renders: {renderCount} (Stable)</Badge>
}

export default function GlobalStatePage() {
  const [globalState, setGlobalState] = useState<GlobalUIState>({
    isModalOpen: false,
    selectedTab: "home",
    searchQuery: "",
  })

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
          <h1 className="text-4xl font-bold mb-4">Overusing Global State</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Reaching for global state management solutions for state that should remain local leads to unnecessary
            complexity and performance issues.
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
                  Global State for Local UI
                </CardTitle>
                <CardDescription>
                  Modal state in global context causes all consumers to re-render. Watch the counter increase when you
                  open/close the modal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UIContext.Provider value={{ state: globalState, setState: setGlobalState }}>
                  <div className="space-y-4">
                    <BadRenderCounter />
                    <BadModalComponent />
                  </div>
                </UIContext.Provider>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="good">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="default">Best Practice</Badge>
                  Local State Management
                </CardTitle>
                <CardDescription>
                  Modal state is local to the component. Other components don't re-render when the modal opens/closes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <GoodRenderCounter />
                  <GoodModalComponent />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle>Key Takeaways</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>• Keep state as local as possible to prevent unnecessary re-renders</p>
            <p>• Global state should only contain truly global concerns (user auth, theme)</p>
            <p>• UI state like modals, tabs, and forms should typically be local</p>
            <p>• Context changes trigger re-renders in all consuming components</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
