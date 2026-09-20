import { api } from "@/lib/api/axios";

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
