export enum Role {
  ADMIN = "admin",
  EDITOR = "editor",
  USER = "user",
  GUEST = "guest",
}

export enum Permission {
  // Project permissions
  PROJECT_CREATE = "project:create",
  PROJECT_READ = "project:read",
  PROJECT_UPDATE = "project:update",
  PROJECT_DELETE = "project:delete",

  // User management permissions
  USER_READ = "user:read",
  USER_UPDATE = "user:update",
  USER_DELETE = "user:delete",
  USER_MANAGE_ROLES = "user:manage_roles",

  // Admin permissions
  ADMIN_ACCESS = "admin:access",
  ADMIN_SETTINGS = "admin:settings",
}

const rolePermissions: Record<Role, Permission[]> = {
  [Role.ADMIN]: [
    Permission.PROJECT_CREATE,
    Permission.PROJECT_READ,
    Permission.PROJECT_UPDATE,
    Permission.PROJECT_DELETE,
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.USER_DELETE,
    Permission.USER_MANAGE_ROLES,
    Permission.ADMIN_ACCESS,
    Permission.ADMIN_SETTINGS,
  ],
  [Role.EDITOR]: [Permission.PROJECT_CREATE, Permission.PROJECT_READ, Permission.PROJECT_UPDATE, Permission.USER_READ],
  [Role.USER]: [Permission.PROJECT_CREATE, Permission.PROJECT_READ, Permission.PROJECT_UPDATE],
  [Role.GUEST]: [Permission.PROJECT_READ],
}

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some((permission) => hasPermission(role, permission))
}

export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every((permission) => hasPermission(role, permission))
}

export function getRolePermissions(role: Role): Permission[] {
  return rolePermissions[role] || []
}
