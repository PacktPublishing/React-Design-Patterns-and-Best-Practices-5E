"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react"

// Anti-pattern: Directly using props to initialize state
interface UserProfileBadProps {
  initialName: string
  initialEmail: string
  onSave: (name: string, email: string) => void
}

const UserProfileBad: React.FC<UserProfileBadProps> = ({ initialName, initialEmail, onSave }) => {
  // This creates a synchronization problem
  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)

  // The state won't update when props change
  // This component becomes "stuck" with the initial values

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave(name, email)
      }}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="bad-name">Name</Label>
        <Input id="bad-name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="bad-email">Email</Label>
        <Input id="bad-email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <Button type="submit">Save</Button>
    </form>
  )
}

// Best practice: Properly handling prop changes
interface UserProfileGoodProps {
  name: string
  email: string
  onNameChange: (name: string) => void
  onEmailChange: (email: string) => void
  onSave: () => void
}

const UserProfileGood: React.FC<UserProfileGoodProps> = ({ name, email, onNameChange, onEmailChange, onSave }) => {
  // Fully controlled component - state managed by parent
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave()
      }}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="good-name">Name</Label>
        <Input id="good-name" value={name} onChange={(e) => onNameChange(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="good-email">Email</Label>
        <Input id="good-email" value={email} onChange={(e) => onEmailChange(e.target.value)} />
      </div>
      <Button type="submit">Save</Button>
    </form>
  )
}

// Alternative: Using useEffect to sync with props when needed
const UserProfileWithSync: React.FC<{
  defaultName: string
  defaultEmail: string
  onSave: (name: string, email: string) => void
  resetTrigger?: number
}> = ({ defaultName, defaultEmail, onSave, resetTrigger }) => {
  const [name, setName] = useState(defaultName)
  const [email, setEmail] = useState(defaultEmail)

  // Explicitly handle prop changes when needed
  useEffect(() => {
    if (resetTrigger !== undefined) {
      setName(defaultName)
      setEmail(defaultEmail)
    }
  }, [resetTrigger, defaultName, defaultEmail])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave(name, email)
      }}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="sync-name">Name</Label>
        <Input id="sync-name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="sync-email">Email</Label>
        <Input id="sync-email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <Button type="submit">Save</Button>
    </form>
  )
}

export default function StatePropsPage() {
  const [parentName, setParentName] = useState("John Doe")
  const [parentEmail, setParentEmail] = useState("john@example.com")
  const [resetTrigger, setResetTrigger] = useState(0)
  const [savedData, setSavedData] = useState<string>("")

  const handleReset = () => {
    setParentName("Jane Smith")
    setParentEmail("jane@example.com")
    setResetTrigger((prev) => prev + 1)
  }

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
          <h1 className="text-4xl font-bold mb-4">State Initialization from Props</h1>
          <p className="text-lg text-muted-foreground text-balance">
            One of the most common anti-patterns involves initializing component state directly from props without
            proper consideration of how React manages component updates.
          </p>
        </div>

        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Parent Controls</CardTitle>
              <CardDescription>
                Click "Change Parent Data" to see how each approach handles prop updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label>Parent Name</Label>
                    <div className="font-mono text-sm mt-1">{parentName}</div>
                  </div>
                  <div className="flex-1">
                    <Label>Parent Email</Label>
                    <div className="font-mono text-sm mt-1">{parentEmail}</div>
                  </div>
                </div>
                <Button onClick={handleReset}>Change Parent Data</Button>
                {savedData && (
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>Saved: {savedData}</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bad" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bad">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Anti-Pattern
            </TabsTrigger>
            <TabsTrigger value="good">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Best Practice
            </TabsTrigger>
            <TabsTrigger value="sync">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              With Sync
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bad">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="destructive">Anti-Pattern</Badge>
                  Direct State Initialization
                </CardTitle>
                <CardDescription>
                  State is initialized once and never updates when props change. Try changing the parent data - the form
                  won't update!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserProfileBad
                  initialName={parentName}
                  initialEmail={parentEmail}
                  onSave={(name, email) => setSavedData(`Bad: ${name} (${email})`)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="good">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="default">Best Practice</Badge>
                  Fully Controlled Component
                </CardTitle>
                <CardDescription>
                  State is managed by the parent. Changes to parent data immediately reflect in the form.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserProfileGood
                  name={parentName}
                  email={parentEmail}
                  onNameChange={setParentName}
                  onEmailChange={setParentEmail}
                  onSave={() => setSavedData(`Good: ${parentName} (${parentEmail})`)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sync">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="default">Best Practice</Badge>
                  Explicit Synchronization
                </CardTitle>
                <CardDescription>
                  Uses useEffect to explicitly sync with props when needed via a reset trigger.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserProfileWithSync
                  defaultName={parentName}
                  defaultEmail={parentEmail}
                  resetTrigger={resetTrigger}
                  onSave={(name, email) => setSavedData(`Sync: ${name} (${email})`)}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle>Key Takeaways</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>• useState only uses the initial value during the first render</p>
            <p>• Fully controlled components maintain a single source of truth</p>
            <p>• Use useEffect with explicit dependencies for prop synchronization</p>
            <p>• Prefer lifting state up over complex synchronization logic</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
