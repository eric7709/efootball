import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { authRepository } from "./api.auth";
import { useAuthStore } from "../store.auth";

export function useCurrentUser() {
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useQuery({
    queryKey: queryKeys.auth.currentUser,
    queryFn: async () => {
      try {
        const user = await authRepository.getCurrentUser();
        setUser(user);

        return user;
      } catch (error) {
        clearAuth();
        throw error;
      }
    },
    retry: false,
  });
}
