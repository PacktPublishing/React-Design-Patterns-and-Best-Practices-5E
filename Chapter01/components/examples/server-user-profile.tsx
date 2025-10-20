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

async function fetchUserDirectly(userId: string): Promise<User | null> {
  // Simulate database query
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    id: userId,
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: new Date("2023-01-15").toISOString(),
  }
}

export default async function ServerUserProfile({ userId }: Props) {
  const user = await fetchUserDirectly(userId)

  if (!user) {
    return (
      <Alert variant="destructive">
        <AlertDescription>User not found</AlertDescription>
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
