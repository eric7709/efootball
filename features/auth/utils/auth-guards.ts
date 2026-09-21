import type { AuthUser, UserRole } from "../types.auth";

export function hasRole(user: AuthUser | null, roles: UserRole[]) {
  if (!user) {
    return false;
  }
  return roles.includes(user.role);
}

export function isAuthenticated(user: AuthUser | null) {
  return Boolean(user);
}
