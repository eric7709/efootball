import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authRepository } from "./api.auth";
import { useAuthStore } from "../store.auth";

export function useLogout() {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: () => authRepository.logout(),

    onSuccess: () => {
      clearAuth();
      queryClient.clear();
    },
  });
}
