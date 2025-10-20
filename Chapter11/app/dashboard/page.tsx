import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { UserProfile } from "@/components/user-profile"
import { ActivityFeed } from "@/components/activity-feed"

type DashboardData = {
  user: { id: string; name: string | null; email: string | null }
  projects: Array<{ id: string; name: string; updatedAt: string }>
  activities: Array<{
    id: string
    type: string
    createdAt: string
    message?: string | null
  }>
}

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) {
    redirect("/auth/signin")
  }

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/me`, {
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
  })

  if (!res.ok) {
    redirect("/auth/signin")
  }

  const data: DashboardData = await res.json()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {data.user.name ?? "friend"}</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ActivityFeed activities={data.activities} />
          </div>
          <div>
            <UserProfile user={data.user} projects={data.projects} />
          </div>
        </div>
      </main>
    </div>
  )
}
