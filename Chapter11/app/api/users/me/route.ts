import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { users, projects, activities } from "@/db/schema"
import { desc, eq } from "drizzle-orm"

export const runtime = "nodejs"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = session.user.id

  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)

  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const [proj, acts] = await Promise.all([
    db
      .select({
        id: projects.id,
        name: projects.name,
        updatedAt: projects.updatedAt,
      })
      .from(projects)
      .where(eq(projects.userId, userId))
      .orderBy(desc(projects.updatedAt))
      .limit(5),

    db
      .select({
        id: activities.id,
        type: activities.type,
        createdAt: activities.createdAt,
        message: activities.message,
      })
      .from(activities)
      .where(eq(activities.userId, userId))
      .orderBy(desc(activities.createdAt))
      .limit(10),
  ])

  return NextResponse.json({
    user,
    projects: proj,
    activities: acts,
  })
}
