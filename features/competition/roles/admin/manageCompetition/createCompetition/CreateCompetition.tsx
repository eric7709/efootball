"use client";

import { FormEvent, useState } from "react";
import axios from "axios";

import { FormField } from "@/features/shared/ui/FormField";
import { SelectInput } from "@/features/shared/ui/SelectInput";
import { SubmitButton } from "@/features/shared/ui/SubmitButton";
import { TextArea } from "@/features/shared/ui/TextArea";
import { TextInput } from "@/features/shared/ui/TextInput";
import { useCreateCompetition } from "@/features/competition/hooks/api.competition";

import type {
  CompetitionType,
  CreateCompetitionInput,
} from "@/features/competition/types.competition";

type FormValues = {
  name: string;
  description: string;
  year: string;
  season: string;
  type: CompetitionType;
  numberOfTeams: string;
  platform: CreateCompetitionInput["platform"];
  gameMode: string;
  location: string;
  registrationStart: string;
  registrationEnd: string;
  startDate: string;
  endDate: string;
  prizePool: string;
  logo: string;
  banner: string;
};

const initialValues: FormValues = {
  name: "",
  description: "",
  year: String(new Date().getFullYear()),
  season: "",
  type: "LEAGUE",
  numberOfTeams: "",
  platform: "MOBILE",
  gameMode: "",
  location: "",
  registrationStart: "",
  registrationEnd: "",
  startDate: "",
  endDate: "",
  prizePool: "",
  logo: "",
  banner: "",
};

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.message;
    return typeof detail === "string"
      ? detail
      : "Unable to create the competition. Please try again.";
  }

  return "Unable to create the competition. Please try again.";
}

export function CreateCompetition() {
  const createCompetition = useCreateCompetition();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function updateValue<Key extends keyof FormValues>(
    key: Key,
    value: FormValues[Key],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const registrationStart = new Date(values.registrationStart);
    const registrationEnd = new Date(values.registrationEnd);
    const startDate = new Date(values.startDate);
    const endDate = new Date(values.endDate);

    if (registrationEnd < registrationStart) {
      setError("Registration end must be after registration start.");
      return;
    }

    if (startDate < registrationEnd) {
      setError("The competition must start after registration closes.");
      return;
    }

    if (endDate < startDate) {
      setError("End date must be after the start date.");
      return;
    }

    const input: CreateCompetitionInput = {
      name: values.name.trim(),
      description: values.description.trim() || undefined,
      year: Number(values.year),
      season: values.season.trim() || undefined,
      type: values.type,
      numberOfTeams: Number(values.numberOfTeams),
      platform: values.platform,
      gameMode: values.gameMode.trim(),
      location: values.location.trim() || undefined,
      registrationStart: registrationStart.toISOString(),
      registrationEnd: registrationEnd.toISOString(),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      prizePool: values.prizePool ? Number(values.prizePool) : undefined,
      logo: values.logo.trim() || undefined,
      banner: values.banner.trim() || undefined,
    };

    try {
      await createCompetition.mutateAsync(input);
      setValues(initialValues);
      setSuccess("Competition created successfully.");
    } catch (submissionError) {
      setError(getErrorMessage(submissionError));
    }
  }

  return (
    <section className="panel" style={{ maxWidth: 920 }}>
      <div style={{ marginBottom: 24 }}>
        <p className="eyebrow" style={{ margin: "0 0 8px" }}>
          COMPETITIONS
        </p>
        <h1 style={{ margin: 0 }}>Create competition</h1>
        <p className="muted">
          Set up a competition and open it for registration when ready.
        </p>
      </div>

      <form className="grid" onSubmit={handleSubmit}>
        <div className="grid grid-2">
          <FormField label="Competition name" htmlFor="name">
            <TextInput
              id="name"
              required
              value={values.name}
              onChange={(event) => updateValue("name", event.target.value)}
            />
          </FormField>
          <FormField label="Year" htmlFor="year">
            <TextInput
              id="year"
              required
              type="number"
              min="2000"
              value={values.year}
              onChange={(event) => updateValue("year", event.target.value)}
            />
          </FormField>
          <FormField label="Competition type" htmlFor="type">
            <SelectInput
              id="type"
              value={values.type}
              onChange={(event) =>
                updateValue("type", event.target.value as CompetitionType)
              }
            >
              <option value="LEAGUE">League</option>
              <option value="KNOCKOUT">Knockout</option>
              <option value="GROUP_STAGE">Group stage</option>
              <option value="GROUP_KNOCKOUT">Group & knockout</option>
              <option value="SWISS">Swiss</option>
              <option value="CUSTOM">Custom</option>
            </SelectInput>
          </FormField>
          <FormField label="Teams" htmlFor="numberOfTeams">
            <TextInput
              id="numberOfTeams"
              required
              type="number"
              min="2"
              value={values.numberOfTeams}
              onChange={(event) =>
                updateValue("numberOfTeams", event.target.value)
              }
            />
          </FormField>
          <FormField label="Platform" htmlFor="platform">
            <SelectInput
              id="platform"
              value={values.platform}
              onChange={(event) =>
                updateValue(
                  "platform",
                  event.target.value as FormValues["platform"],
                )
              }
            >
              <option value="MOBILE">Mobile</option>
              <option value="PLAYSTATION">PlayStation</option>
              <option value="XBOX">Xbox</option>
              <option value="PC">PC</option>
            </SelectInput>
          </FormField>
          <FormField label="Game mode" htmlFor="gameMode">
            <TextInput
              id="gameMode"
              required
              placeholder="e.g. eFootball 2026"
              value={values.gameMode}
              onChange={(event) => updateValue("gameMode", event.target.value)}
            />
          </FormField>
        </div>

        <FormField label="Description" htmlFor="description">
          <TextArea
            id="description"
            value={values.description}
            onChange={(event) => updateValue("description", event.target.value)}
          />
        </FormField>

        <div className="grid grid-2">
          <FormField label="Registration starts" htmlFor="registrationStart">
            <TextInput
              id="registrationStart"
              required
              type="datetime-local"
              value={values.registrationStart}
              onChange={(event) =>
                updateValue("registrationStart", event.target.value)
              }
            />
          </FormField>
          <FormField label="Registration ends" htmlFor="registrationEnd">
            <TextInput
              id="registrationEnd"
              required
              type="datetime-local"
              value={values.registrationEnd}
              onChange={(event) =>
                updateValue("registrationEnd", event.target.value)
              }
            />
          </FormField>
          <FormField label="Competition starts" htmlFor="startDate">
            <TextInput
              id="startDate"
              required
              type="datetime-local"
              value={values.startDate}
              onChange={(event) => updateValue("startDate", event.target.value)}
            />
          </FormField>
          <FormField label="Competition ends" htmlFor="endDate">
            <TextInput
              id="endDate"
              required
              type="datetime-local"
              value={values.endDate}
              onChange={(event) => updateValue("endDate", event.target.value)}
            />
          </FormField>
          <FormField label="Season" htmlFor="season">
            <TextInput
              id="season"
              placeholder="e.g. Season 1"
              value={values.season}
              onChange={(event) => updateValue("season", event.target.value)}
            />
          </FormField>
          <FormField label="Location" htmlFor="location">
            <TextInput
              id="location"
              value={values.location}
              onChange={(event) => updateValue("location", event.target.value)}
            />
          </FormField>
          <FormField label="Prize pool" htmlFor="prizePool">
            <TextInput
              id="prizePool"
              type="number"
              min="0"
              step="0.01"
              value={values.prizePool}
              onChange={(event) => updateValue("prizePool", event.target.value)}
            />
          </FormField>
          <FormField label="Logo URL" htmlFor="logo">
            <TextInput
              id="logo"
              type="url"
              value={values.logo}
              onChange={(event) => updateValue("logo", event.target.value)}
            />
          </FormField>
        </div>

        <FormField label="Banner URL" htmlFor="banner">
          <TextInput
            id="banner"
            type="url"
            value={values.banner}
            onChange={(event) => updateValue("banner", event.target.value)}
          />
        </FormField>

        {error ? (
          <p role="alert" style={{ color: "var(--danger)", margin: 0 }}>
            {error}
          </p>
        ) : null}
        {success ? (
          <p role="status" style={{ color: "var(--success)", margin: 0 }}>
            {success}
          </p>
        ) : null}
        <div>
          <SubmitButton loading={createCompetition.isPending}>
            Create competition
          </SubmitButton>
        </div>
      </form>
    </section>
  );
}
