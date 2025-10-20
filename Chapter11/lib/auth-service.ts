import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { users } from "@/db/schema"

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
}

export async function validateCredentials(email: string, password: string): Promise<AuthUser | null> {
  const normalizedEmail = email.toLowerCase()

  const rows = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      isActive: users.isActive,
      passwordHash: users.passwordHash,
    })
    .from(users)
    .where(eq(users.email, normalizedEmail))
    .limit(1)

  const user = rows[0]
  if (!user || !user.isActive || !user.passwordHash) return null

  const isValidPassword = await bcrypt.compare(password, user.passwordHash)
  if (!isValidPassword) return null

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }
}

export async function createUser(email: string, password: string, name: string): Promise<AuthUser> {
  const normalizedEmail = email.toLowerCase()
  const passwordHash = await bcrypt.hash(password, 12)

  const inserted = await db
    .insert(users)
    .values({
      email: normalizedEmail,
      name,
      passwordHash,
      role: "user",
      isActive: true,
    })
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
    })

  const user = inserted[0]!
  return user
}

export async function updateUserLastLogin(userId: string): Promise<void> {
  await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, userId))
}
