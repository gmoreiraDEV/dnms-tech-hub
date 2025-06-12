export function requireRole(user: {role: string}, allowedRoles: string[]) {
  return allowedRoles.includes(user.role)
}
