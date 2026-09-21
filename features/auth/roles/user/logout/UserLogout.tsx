"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

import { SubmitButton } from "@/features/shared/ui/SubmitButton";
import { useLogout } from "@/features/auth/hooks/api.auth";
import { useAuthStore } from "@/features/auth/store.auth";

function getErrorMessage(error: unknown) {
  if (
    axios.isAxiosError(error) &&
    typeof error.response?.data?.message === "string"
  ) {
    return error.response.data.message;
  }

  return "Unable to sign out. Please try again.";
}

export function UserLogout() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  function handleLogout() {
    logout.mutate(undefined, { onSuccess: () => router.replace("/") });
  }

  return (
    <section className="panel grid" style={{ maxWidth: 460 }}>
      <div>
        <p className="eyebrow" style={{ margin: 0 }}>
          ACCOUNT
        </p>
        <h1 style={{ marginBottom: 8 }}>Sign out</h1>
        <p className="muted" style={{ margin: 0 }}>
          {user
            ? `You are signed in as ${user.displayName ?? user.username}.`
            : "End your current session."}
        </p>
      </div>
      {logout.isError ? (
        <p role="alert" style={{ color: "var(--danger)", margin: 0 }}>
          {getErrorMessage(logout.error)}
        </p>
      ) : null}
      <div>
        <SubmitButton
          type="button"
          loading={logout.isPending}
          onClick={handleLogout}
        >
          Sign out
        </SubmitButton>
      </div>
    </section>
  );
}
