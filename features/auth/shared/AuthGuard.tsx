"use client";

import { useEffect } from "react";

import { useCurrentUser } from "../hooks/api.auth";
import { useAuthStore } from "../store.auth";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const user = useAuthStore((state) => state.user);
  const { isLoading } = useCurrentUser();

  useEffect(() => {
    if (!isLoading && !user) {
      // Navigation belongs to the route layer. This guard only resolves auth state.
    }
  }, [isLoading, user]);

  if (isLoading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return children;
}
