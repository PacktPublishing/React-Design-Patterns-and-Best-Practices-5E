"use client"

import { useState, useContext, createContext, useMemo, memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, CheckCircle2, Sun, Moon } from "lucide-react"

// Anti-pattern: Single context for everything
interface AppContextType {
  user: { name: string } | null
  theme: "light" | "dark"
  setTheme: (theme: "light" | "dark") => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

let badUserRenderCount = 0
let badThemeRenderCount = 0

const BadUserProfile = () => {
  const context = useContext(AppContext)
  badUserRenderCount++

  return (
    <div className="p-4 border rounded">
      <p className="font-semibold">User: {context?.user?.name || "Guest"}</p>
      <Badge variant="destructive" className="mt-2">
        Renders: {badUserRenderCount}
      </Badge>
      <p className="text-xs text-muted-foreground mt-1">Re-renders when theme changes!</p>
    </div>
  )
}

const BadThemeToggle = () => {
  const context = useContext(AppContext)
  badThemeRenderCount++

  return (
    <div className="p-4 border rounded">
      <Button onClick={() => context?.setTheme(context.theme === "light" ? "dark" : "light")} variant="outline">
        {context?.theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        <span className="ml-2">Toggle Theme</span>
      </Button>
      <Badge variant="destructive" className="mt-2">
        Renders: {badThemeRenderCount}
      </Badge>
    </div>
  )
}

// Best practice: Split contexts
const UserContext = createContext<{ user: { name: string } | null } | undefined>(undefined)
const ThemeContext = createContext<
  | {
      theme: "light" | "dark"
      setTheme: (theme: "light" | "dark") => void
    }
  | undefined
>(undefined)

let goodUserRenderCount = 0
let goodThemeRenderCount = 0

const GoodUserProfile = memo(() => {
  const context = useContext(UserContext)
  goodUserRenderCount++

  return (
    <div className="p-4 border rounded">
      <p className="font-semibold">User: {context?.user?.name || "Guest"}</p>
      <Badge variant="default" className="mt-2">
        Renders: {goodUserRenderCount}
      </Badge>
      <p className="text-xs text-muted-foreground mt-1">Doesn't re-render on theme changes!</p>
    </div>
  )
})

GoodUserProfile.displayName = "GoodUserProfile"

const GoodThemeToggle = memo(() => {
  const context = useContext(ThemeContext)
  goodThemeRenderCount++

  return (
    <div className="p-4 border rounded">
      <Button onClick={() => context?.setTheme(context.theme === "light" ? "dark" : "light")} variant="outline">
        {context?.theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        <span className="ml-2">Toggle Theme</span>
      </Button>
      <Badge variant="default" className="mt-2">
        Renders: {goodThemeRenderCount}
      </Badge>
    </div>
  )
})

GoodThemeToggle.displayName = "GoodThemeToggle"

export default function ContextOverusePage() {
  const [user] = useState<{ name: string } | null>({ name: "John Doe" })
  const [badTheme, setBadTheme] = useState<"light" | "dark">("light")
  const [goodTheme, setGoodTheme] = useState<"light" | "dark">("light")

  // Bad: Creates new object on every render
  const badContextValue = {
    user,
    theme: badTheme,
    setTheme: setBadTheme,
  }

  // Good: Memoized values
  const userContextValue = useMemo(() => ({ user }), [user])
  const themeContextValue = useMemo(() => ({ theme: goodTheme, setTheme: setGoodTheme }), [goodTheme])

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
          <h1 className="text-4xl font-bold mb-4">Context API Overuse</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Using a single context for unrelated state causes unnecessary re-renders across your entire application.
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
                  Single Global Context
                </CardTitle>
                <CardDescription>
                  Toggle the theme and watch BOTH components re-render, even though the user profile doesn't use theme
                  data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AppContext.Provider value={badContextValue}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <BadUserProfile />
                    <BadThemeToggle />
                  </div>
                </AppContext.Provider>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="good">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="default">Best Practice</Badge>
                  Split Contexts
                </CardTitle>
                <CardDescription>
                  Toggle the theme and notice only the theme toggle re-renders. The user profile remains stable.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserContext.Provider value={userContextValue}>
                  <ThemeContext.Provider value={themeContextValue}>
                    <div className="grid gap-4 md:grid-cols-2">
                      <GoodUserProfile />
                      <GoodThemeToggle />
                    </div>
                  </ThemeContext.Provider>
                </UserContext.Provider>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle>Key Takeaways</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>• Split unrelated state into separate contexts</p>
            <p>• Use useMemo to stabilize context values and prevent re-renders</p>
            <p>• Context changes trigger re-renders in ALL consuming components</p>
            <p>• Consider composition and prop drilling for small component trees</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
