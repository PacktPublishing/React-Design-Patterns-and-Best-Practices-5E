"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react"

interface UserData {
  id: string
  name: string
  email: string
}

// Anti-pattern: Side effects in component body (simulated)
const BadSideEffects: React.FC<{ userId: string }> = ({ userId }) => {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")

  // Simulating the problem - in reality this would cause infinite loops
  // We're showing the concept without breaking the app
  useEffect(() => {
    // This simulates what happens with side effects in component body
    setErrorMessage("⚠️ Side effects in component body cause infinite loops!")
  }, [])

  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
      <div className="p-4 border rounded">
        <p className="text-sm text-muted-foreground">Problems with side effects in component body:</p>
        <ul className="list-disc list-inside text-sm mt-2 space-y-1">
          <li>Fetch in component body causes infinite loops</li>
          <li>Direct DOM manipulation runs on every render</li>
          <li>Event listeners without cleanup cause memory leaks</li>
        </ul>
      </div>
    </div>
  )
}

// Best practice: Proper side effect management
const ProperSideEffects: React.FC<{ userId: string }> = ({ userId }) => {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [windowWidth, setWindowWidth] = useState<number>(0)

  // Properly managed data fetching
  useEffect(() => {
    let cancelled = false

    const fetchUserData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const data: UserData = {
          id: userId,
          name: "John Doe",
          email: "john@example.com",
        }

        // Check if component is still mounted
        if (!cancelled) {
          setUserData(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error")
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchUserData()

    // Cleanup function
    return () => {
      cancelled = true
    }
  }, [userId])

  // Properly managed DOM updates
  useEffect(() => {
    const previousTitle = document.title
    document.title = userData ? `User: ${userData.name}` : "Loading..."

    // Restore previous title on unmount
    return () => {
      document.title = previousTitle
    }
  }, [userData])

  // Properly managed event listeners
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Set initial value
    handleResize()

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  if (loading)
    return (
      <div className="flex items-center gap-2 p-4">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading user data...</span>
      </div>
    )

  if (error)
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>Error: {error}</AlertDescription>
      </Alert>
    )

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded">
        <h3 className="font-semibold mb-2">User Data</h3>
        <p className="text-sm">Name: {userData?.name}</p>
        <p className="text-sm">Email: {userData?.email}</p>
      </div>
      <div className="p-4 border rounded">
        <p className="text-sm">Window Width: {windowWidth}px</p>
        <p className="text-xs text-muted-foreground mt-1">Resize your browser to see this update</p>
      </div>
      <Alert>
        <CheckCircle2 className="h-4 w-4" />
        <AlertDescription>All side effects properly managed with cleanup functions</AlertDescription>
      </Alert>
    </div>
  )
}

export default function SideEffectsPage() {
  const [userId, setUserId] = useState("user-123")
  const [showGood, setShowGood] = useState(false)

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
          <h1 className="text-4xl font-bold mb-4">Side Effects Management</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Performing side effects directly in component bodies or without proper cleanup leads to bugs, memory leaks,
            and unpredictable behavior.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button onClick={() => setUserId(`user-${Date.now()}`)}>Change User ID</Button>
              <Button onClick={() => setShowGood(!showGood)} variant="outline">
                {showGood ? "Unmount" : "Mount"} Good Example
              </Button>
            </div>
          </CardContent>
        </Card>

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
                  Side Effects in Component Body
                </CardTitle>
                <CardDescription>
                  Side effects performed directly in the component body without useEffect cause infinite loops and
                  memory leaks.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BadSideEffects userId={userId} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="good">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="default">Best Practice</Badge>
                  Proper useEffect with Cleanup
                </CardTitle>
                <CardDescription>
                  Side effects are properly managed with useEffect, cleanup functions, and cancellation flags.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {showGood ? (
                  <ProperSideEffects userId={userId} />
                ) : (
                  <p className="text-muted-foreground">
                    Click "Mount Good Example" to see proper side effect management
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle>Key Takeaways</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>• Always use useEffect for side effects, never in component body</p>
            <p>• Return cleanup functions from useEffect to prevent memory leaks</p>
            <p>• Use cancellation flags for async operations to handle unmounting</p>
            <p>• Specify correct dependencies to control when effects run</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
