import type { User } from "@prisma/client"
import { Card } from "@/components/ui/card"

type UserListProps = {
  users: Pick<User, "id" | "name" | "email" | "createdAt">[]
}

export default function UserList({ users }: UserListProps) {
  if (users.length === 0) {
    return (
      <Card className="mt-8 p-6 text-center text-sm text-muted-foreground">
        No users found yet. Create one using the form above.
      </Card>
    )
  }

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold">Registered Users</h2>
      <div className="space-y-3">
        {users.map((user) => (
          <Card key={user.id} className="p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <span className="text-xs text-muted-foreground">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
