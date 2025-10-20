import { type NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { projects, users } from "@/db/schema"

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const rows = await db
    .select({
      project: {
        id: projects.id,
        userId: projects.userId,
        name: projects.name,
        description: projects.description,
        createdAt: projects.createdAt,
        updatedAt: projects.updatedAt,
      },
      user: {
        id: users.id,
        name: users.name,
        email: users.email,
      },
    })
    .from(projects)
    .leftJoin(users, eq(users.id, projects.userId))
    .where(eq(projects.id, params.id))
    .limit(1)

  const row = rows[0]
  if (!row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  if (row.project.userId !== session.user.id && session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const result = {
    ...row.project,
    user: row.user,
  }

  return NextResponse.json(result)
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const found = await db.select({ userId: projects.userId }).from(projects).where(eq(projects.id, params.id)).limit(1)

  const existing = found[0]
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  if (existing.userId !== session.user.id && session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const body = await request.json()

  const updated = await db
    .update(projects)
    .set({
      name: body.name,
      description: body.description,
    })
    .where(eq(projects.id, params.id))
    .returning({
      id: projects.id,
      userId: projects.userId,
      name: projects.name,
      description: projects.description,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
    })

  return NextResponse.json(updated[0])
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const found = await db.select({ userId: projects.userId }).from(projects).where(eq(projects.id, params.id)).limit(1)

  const existing = found[0]
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  if (existing.userId !== session.user.id && session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  await db.delete(projects).where(eq(projects.id, params.id))

  return NextResponse.json({ success: true })
}
