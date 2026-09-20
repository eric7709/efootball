"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { FormField } from "@/features/shared/ui/FormField";
import { SubmitButton } from "@/features/shared/ui/SubmitButton";
import { TextInput } from "@/features/shared/ui/TextInput";
import { useRegister } from "@/features/auth/hooks/useRegister";

import type { RegisterInput } from "@/features/auth/types.auth";

const initialForm: RegisterInput = { email: "", username: "", password: "", displayName: "", role: "USER" };

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error) && typeof error.response?.data?.message === "string") return error.response.data.message;
  return "Unable to create your account. Please try again.";
}

export function UserSignup() {
  const router = useRouter();
  const register = useRegister();
  const [form, setForm] = useState<RegisterInput>(initialForm);
  const update = <Key extends Exclude<keyof RegisterInput, "role">>(key: Key, value: RegisterInput[Key]) => setForm((current) => ({ ...current, [key]: value }));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    register.mutate(form, { onSuccess: () => router.replace("/user/dashboard") });
  }

  return <form className="panel grid" onSubmit={handleSubmit} style={{ maxWidth: 460 }}><div><p className="eyebrow" style={{ margin: 0 }}>JOIN THE PLATFORM</p><h1 style={{ marginBottom: 8 }}>Create your account</h1><p className="muted" style={{ margin: 0 }}>Set up your player account to compete in eFootball.</p></div><FormField label="Display name" htmlFor="signup-display-name"><TextInput id="signup-display-name" autoComplete="name" value={form.displayName} onChange={(event) => update("displayName", event.target.value)} /></FormField><FormField label="Username" htmlFor="signup-username"><TextInput id="signup-username" required autoComplete="username" value={form.username} onChange={(event) => update("username", event.target.value)} /></FormField><FormField label="Email address" htmlFor="signup-email"><TextInput id="signup-email" required type="email" autoComplete="email" value={form.email} onChange={(event) => update("email", event.target.value)} /></FormField><FormField label="Password" htmlFor="signup-password"><TextInput id="signup-password" required type="password" minLength={8} autoComplete="new-password" value={form.password} onChange={(event) => update("password", event.target.value)} /></FormField>{register.isError ? <p role="alert" style={{ color: "var(--danger)", margin: 0 }}>{getErrorMessage(register.error)}</p> : null}<SubmitButton loading={register.isPending}>Create account</SubmitButton></form>;
}
