// Example demonstrating the use hook with async operations
"use client"

import { use, Suspense } from "react"
import type { User } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UserProfileProps {
  userPromise: Promise<User>
}

function UserProfile({ userPromise }: UserProfileProps) {
  const user = use(userPromise)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{user.email}</p>
      </CardContent>
    </Card>
  )
}

export function UseHookExample() {
  // Simulate API call
  const userPromise = Promise.resolve({
    id: "1",
    name: "John Doe",
    email: "john@example.com",
  })

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">use Hook Example</h2>
      <Suspense fallback={<div className="text-muted-foreground">Loading user...</div>}>
        <UserProfile userPromise={userPromise} />
      </Suspense>
    </div>
  )
}
