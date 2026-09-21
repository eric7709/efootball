"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { FormField } from "@/features/shared/ui/FormField";
import { SubmitButton } from "@/features/shared/ui/SubmitButton";
import { TextInput } from "@/features/shared/ui/TextInput";
import { useLogin } from "@/features/auth/hooks/api.auth";

import type { LoginInput } from "@/features/auth/types.auth";

const initialForm: LoginInput = { email: "", password: "" };

function getErrorMessage(error: unknown) {
  if (
    axios.isAxiosError(error) &&
    typeof error.response?.data?.message === "string"
  ) {
    return error.response.data.message;
  }

  return "Unable to sign in. Check your details and try again.";
}

export function UserLogin() {
  const router = useRouter();
  const login = useLogin();
  const [form, setForm] = useState<LoginInput>(initialForm);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login.mutate(form, {
      onSuccess: () => router.replace("/user/dashboard"),
    });
  }

  return (
    <form
      className="panel grid"
      onSubmit={handleSubmit}
      style={{ maxWidth: 460 }}
    >
      <div>
        <p className="eyebrow" style={{ margin: 0 }}>
          WELCOME BACK
        </p>
        <h1 style={{ marginBottom: 8 }}>Sign in</h1>
        <p className="muted" style={{ margin: 0 }}>
          Sign in to manage your eFootball activity.
        </p>
      </div>

      <FormField label="Email address" htmlFor="login-email">
        <TextInput
          id="login-email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={(event) =>
            setForm((current) => ({ ...current, email: event.target.value }))
          }
        />
      </FormField>
      <FormField label="Password" htmlFor="login-password">
        <TextInput
          id="login-password"
          type="password"
          autoComplete="current-password"
          required
          value={form.password}
          onChange={(event) =>
            setForm((current) => ({ ...current, password: event.target.value }))
          }
        />
      </FormField>

      {login.isError ? (
        <p role="alert" style={{ color: "var(--danger)", margin: 0 }}>
          {getErrorMessage(login.error)}
        </p>
      ) : null}
      <SubmitButton loading={login.isPending}>Sign in</SubmitButton>
    </form>
  );
}
