import { useMutation } from "@tanstack/react-query";

import { authRepository } from "./api.auth";
import { useAuthStore } from "../store.auth";
import type { RegisterInput } from "../types.auth";

export function useRegister() {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (input: RegisterInput) => authRepository.register(input),

    onSuccess: (response) => {
      setUser(response.user);
    },
  });
}
