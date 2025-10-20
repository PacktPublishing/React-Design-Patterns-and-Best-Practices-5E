import { NextResponse } from "next/server"
import { desc } from "drizzle-orm"
import { requirePermission, withErrorHandling } from "@/lib/rbac/api-guards"
import { Permission } from "@/lib/rbac/roles"
import { db } from "@/lib/db"
import { users } from "@/db/schema"

export const GET = withErrorHandling(async () => {
  await requirePermission(Permission.USER_READ)

  const rows = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      isActive: users.isActive,
      createdAt: users.createdAt,
      lastLoginAt: users.lastLoginAt,
    })
    .from(users)
    .orderBy(desc(users.createdAt))

  return NextResponse.json(rows)
})

export const POST = withErrorHandling(async (request: Request) => {
  await requirePermission(Permission.USER_UPDATE)

  const body = await request.json()
  const { email, name, role } = body as {
    email?: string
    name?: string
    role?: string
  }

  if (!email || !name) {
    return NextResponse.json({ error: "Email and name are required" }, { status: 400 })
  }

  const inserted = await db
    .insert(users)
    .values({
      email: email.toLowerCase(),
      name,
      role: role ?? "user",
      isActive: true,
    })
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      createdAt: users.createdAt,
    })

  return NextResponse.json(inserted[0], { status: 201 })
})
