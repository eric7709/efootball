import { useMutation } from "@tanstack/react-query";

import { authRepository } from "./api.auth";
import { useAuthStore } from "../store.auth";
import type { LoginInput } from "../types.auth";

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (input: LoginInput) => authRepository.login(input),

    onSuccess: (response) => {
      setUser(response.user);
    },
  });
}
