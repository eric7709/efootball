"use client";

import { useAuthStore } from "../store.auth";
import { hasRole } from "../utils/auth-guards";
import type { UserRole } from "../types.auth";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const user = useAuthStore((state) => state.user);

  if (!hasRole(user, allowedRoles)) {
    return null;
  }

  return children;
}
