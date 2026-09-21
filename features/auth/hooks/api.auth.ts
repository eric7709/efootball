import { api } from "@/lib/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { useAuthStore } from "../store.auth";

import type {
  AuthResponse,
  AuthUser,
  LoginInput,
  RegisterInput,
} from "../types.auth";

export const authRepository = {
  async login(input: LoginInput): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", input);

    return response.data;
  },

  async register(input: RegisterInput): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/register", input);

    return response.data;
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },

  async getCurrentUser(): Promise<AuthUser> {
    const response = await api.get<AuthUser>("/auth/me");

    return response.data;
  },
};

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

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (input: LoginInput) => authRepository.login(input),
    onSuccess: (response) => setUser(response.user),
  });
}

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

export function useRegister() {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (input: RegisterInput) => authRepository.register(input),
    onSuccess: (response) => setUser(response.user),
  });
}
