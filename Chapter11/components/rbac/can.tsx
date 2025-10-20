"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { hasPermission, hasAnyPermission, type Permission, type Role } from "@/lib/rbac/roles"

interface CanProps {
  permission?: Permission
  permissions?: Permission[]
  requireAll?: boolean
  fallback?: React.ReactNode
  children: React.ReactNode
}

export function Can({ permission, permissions, requireAll = false, fallback = null, children }: CanProps) {
  const { data: session } = useSession()

  if (!session?.user?.role) {
    return <>{fallback}</>
  }

  const userRole = session.user.role as Role
  let hasAccess = false

  if (permission) {
    hasAccess = hasPermission(userRole, permission)
  } else if (permissions) {
    hasAccess = requireAll
      ? permissions.every((p) => hasPermission(userRole, p))
      : hasAnyPermission(userRole, permissions)
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>
}

interface CannotProps {
  permission?: Permission
  permissions?: Permission[]
  children: React.ReactNode
}

export function Cannot({ permission, permissions, children }: CannotProps) {
  const { data: session } = useSession()

  if (!session?.user?.role) {
    return <>{children}</>
  }

  const userRole = session.user.role as Role
  let hasAccess = false

  if (permission) {
    hasAccess = hasPermission(userRole, permission)
  } else if (permissions) {
    hasAccess = hasAnyPermission(userRole, permissions)
  }

  return hasAccess ? null : <>{children}</>
}
