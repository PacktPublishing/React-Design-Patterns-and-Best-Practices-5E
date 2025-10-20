"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"

type User = {
  id: string
  name: string
  email: string
  createdAt: string
}

type Props = {
  userId: string
}

export default function ClientUserProfile({ userId }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`)
        if (!response.ok) throw new Error("Failed to fetch user")
        const data: User = await response.json()
        setUser(data)
      } catch (error) {
        setError("Failed to fetch user")
        console.error("Failed to fetch user", error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [userId])

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-4 w-56" />
      </div>
    )
  }

  if (error || !user) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error || "User not found"}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-muted-foreground">Email: {user.email}</p>
      <p className="text-sm text-muted-foreground">Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  )
}
