import { db } from "@/lib/db"
import UserForm from "@/components/UserForm"
import UserList from "@/components/UserList"

export default async function UserFormPage() {
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Create User</h1>
        <p className="text-muted-foreground mb-8 text-center">
          Basic form submission using Server Actions
        </p>
        <UserForm />
        <UserList users={users} />
      </div>
    </div>
  )
}
