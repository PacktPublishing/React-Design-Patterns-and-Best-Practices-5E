import { and, eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { accounts, users } from "@/db/schema"

export async function linkOAuthAccount(userId: string, provider: string, providerAccountId: string) {
  const inserted = await db
    .insert(accounts)
    .values({
      userId,
      provider,
      providerAccountId,
      type: "oauth",
    })
    .returning()
  return inserted[0]!
}

type UserWithAccounts = {
  id: string
  email: string
  name: string
  role: string
  isActive: boolean
  emailVerified: Date | null
  accounts: { provider: string; providerAccountId: string }[]
}

export async function findOrCreateOAuthUser(
  email: string,
  name: string,
  provider: string,
  providerAccountId: string,
): Promise<UserWithAccounts> {
  const emailLower = email.toLowerCase()

  return await db.transaction(async (tx) => {
    const existing = await tx
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        isActive: users.isActive,
        emailVerified: users.emailVerified,
      })
      .from(users)
      .where(eq(users.email, emailLower))
      .limit(1)

    if (existing[0]) {
      const u = existing[0]

      const linked = await tx
        .select({ id: accounts.id })
        .from(accounts)
        .where(
          and(
            eq(accounts.userId, u.id),
            eq(accounts.provider, provider),
            eq(accounts.providerAccountId, providerAccountId),
          ),
        )
        .limit(1)

      if (!linked[0]) {
        await tx.insert(accounts).values({
          userId: u.id,
          provider,
          providerAccountId,
          type: "oauth",
        })
      }

      const accs = await tx
        .select({
          provider: accounts.provider,
          providerAccountId: accounts.providerAccountId,
        })
        .from(accounts)
        .where(eq(accounts.userId, u.id))

      return { ...u, accounts: accs }
    }

    const created = await tx
      .insert(users)
      .values({
        email: emailLower,
        name,
        role: "user",
        isActive: true,
        emailVerified: new Date(),
      })
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        isActive: users.isActive,
        emailVerified: users.emailVerified,
      })

    const newUser = created[0]!

    await tx.insert(accounts).values({
      userId: newUser.id,
      provider,
      providerAccountId,
      type: "oauth",
    })

    return {
      ...newUser,
      accounts: [{ provider, providerAccountId }],
    }
  })
}

export async function getUserProviders(userId: string) {
  const rows = await db.select({ provider: accounts.provider }).from(accounts).where(eq(accounts.userId, userId))

  return rows.map((r) => r.provider)
}
