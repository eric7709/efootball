export type UserRole = "ADMIN" | "MODERATOR" | "USER";

export type AuthStatus = "authenticated" | "unauthenticated" | "loading";

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  displayName?: string;
  role: UserRole;
  profileImage?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  username: string;
  password: string;
  displayName?: string;
  role: UserRole;
}

export interface AuthResponse {
  user: AuthUser;
}
