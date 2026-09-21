"use client";

import { useState } from "react";

import { CustomInput } from "@/features/shared/CustomInput";
import { CustomSelect } from "@/features/shared/CustomSelect";
import { FormField } from "@/features/shared/ui/FormField";
import { SubmitButton } from "@/features/shared/ui/SubmitButton";
import { useRegister } from "../../../hooks/api.auth";
import type { RegisterInput, UserRole } from "../../../types.auth";

const roleOptions = [
  { label: "Player", value: "USER" },
  { label: "Moderator", value: "MODERATOR" },
  { label: "Administrator", value: "ADMIN" },
];

const initialForm: RegisterInput = {
  email: "",
  username: "",
  password: "",
  displayName: "",
  role: "USER",
};

function getErrorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : "Unable to create the user. Please try again.";
}

export function CreateUser() {
  const [form, setForm] = useState<RegisterInput>(initialForm);
  const register = useRegister();

  function updateField<K extends keyof RegisterInput>(
    field: K,
    value: RegisterInput[K],
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    register.mutate(form, {
      onSuccess: () => {
        setForm(initialForm);
      },
    });
  }

  return (
    <form
      className="panel grid"
      onSubmit={handleSubmit}
      style={{ maxWidth: 560 }}
    >
      <div>
        <p className="eyebrow" style={{ margin: 0 }}>
          AUTHENTICATION
        </p>
        <h1 style={{ marginBottom: 8 }}>Create user</h1>
        <p className="muted" style={{ margin: 0 }}>
          Create an account and assign its platform role.
        </p>
      </div>

      <FormField label="Display name" htmlFor="displayName">
        <CustomInput
          id="displayName"
          name="displayName"
          value={form.displayName}
          onChange={(event) => updateField("displayName", event.target.value)}
          autoComplete="name"
        />
      </FormField>

      <FormField label="Username" htmlFor="username">
        <CustomInput
          id="username"
          name="username"
          value={form.username}
          onChange={(event) => updateField("username", event.target.value)}
          autoComplete="username"
          required
        />
      </FormField>

      <FormField label="Email address" htmlFor="email">
        <CustomInput
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          autoComplete="email"
          required
        />
      </FormField>

      <FormField label="Role" htmlFor="role">
        <CustomSelect
          id="role"
          name="role"
          options={roleOptions}
          value={form.role}
          onChange={(event) =>
            updateField("role", event.target.value as UserRole)
          }
        />
      </FormField>

      <FormField label="Password" htmlFor="password">
        <CustomInput
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={(event) => updateField("password", event.target.value)}
          autoComplete="new-password"
          minLength={8}
          required
        />
      </FormField>

      {register.isError ? (
        <p role="alert" style={{ color: "var(--danger)", margin: 0 }}>
          {getErrorMessage(register.error)}
        </p>
      ) : null}

      <SubmitButton loading={register.isPending}>Create user</SubmitButton>
    </form>
  );
}
