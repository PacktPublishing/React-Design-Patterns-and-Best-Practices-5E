import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { hasPermission, type Permission, type Role } from "@/lib/rbac/roles"

export class AuthorizationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "AuthorizationError"
  }
}

export async function requireAuth() {
  const session = await auth()

  if (!session?.user) {
    throw new AuthorizationError("Authentication required")
  }

  return session
}

export async function requirePermission(permission: Permission) {
  const session = await requireAuth()
  const userRole = session.user.role as Role

  if (!hasPermission(userRole, permission)) {
    throw new AuthorizationError(`Missing required permission: ${permission}`)
  }

  return session
}

export async function requirePermissions(permissions: Permission[]) {
  const session = await requireAuth()
  const userRole = session.user.role as Role

  const missingPermissions = permissions.filter((permission) => !hasPermission(userRole, permission))

  if (missingPermissions.length > 0) {
    throw new AuthorizationError(`Missing required permissions: ${missingPermissions.join(", ")}`)
  }

  return session
}

export async function requireRole(role: Role) {
  const session = await requireAuth()

  if (session.user.role !== role) {
    throw new AuthorizationError(`Requires ${role} role`)
  }

  return session
}

export function withErrorHandling(handler: Function) {
  return async (...args: any[]) => {
    try {
      return await handler(...args)
    } catch (error) {
      if (error instanceof AuthorizationError) {
        return NextResponse.json(
          { error: error.message },
          { status: error.message.includes("Authentication") ? 401 : 403 },
        )
      }

      console.error("API Error:", error)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
  }
}
