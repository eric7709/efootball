"use client";

import { FormEvent, useState } from "react";

import { FormField } from "@/features/shared/ui/FormField";
import { Modal } from "@/features/shared/ui/Modal";
import { SubmitButton } from "@/features/shared/ui/SubmitButton";
import { TextInput } from "@/features/shared/ui/TextInput";
import { useMatchStore } from "@/features/match/store.match";

import type { Match } from "@/features/match/types.match";

interface CreateMatchModalProps {
  onCreate: (match: Match) => void;
}

const initialValues = {
  competitionId: "",
  homeTeamId: "",
  awayTeamId: "",
  stage: "",
  round: "",
  scheduledAt: "",
};

export function CreateMatchModal({ onCreate }: CreateMatchModalProps) {
  const { modalType, closeModal } = useMatchStore();
  const [values, setValues] = useState(initialValues);
  const isOpen = modalType === "create";

  const update = (key: keyof typeof values, value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const timestamp = new Date().toISOString();

    onCreate({
      id: `match-${Date.now()}`,
      competitionId: values.competitionId.trim() || undefined,
      homeTeamId: values.homeTeamId.trim(),
      awayTeamId: values.awayTeamId.trim(),
      stage: values.stage.trim() || undefined,
      round: values.round.trim() || undefined,
      status: "SCHEDULED",
      scheduledAt: values.scheduledAt,
    });

    setValues(initialValues);
    closeModal();
  }

  return (
    <Modal open={isOpen} title="Create match" onClose={closeModal}>
      <form className="grid" onSubmit={handleSubmit}>
        <div className="grid grid-2">
          <FormField label="Competition ID" htmlFor="match-competition">
            <TextInput
              id="match-competition"
              required
              value={values.competitionId}
              onChange={(event) => update("competitionId", event.target.value)}
            />
          </FormField>
          <FormField label="Home team ID" htmlFor="match-home-team">
            <TextInput
              id="match-home-team"
              required
              value={values.homeTeamId}
              onChange={(event) => update("homeTeamId", event.target.value)}
            />
          </FormField>
          <FormField label="Away team ID" htmlFor="match-away-team">
            <TextInput
              id="match-away-team"
              required
              value={values.awayTeamId}
              onChange={(event) => update("awayTeamId", event.target.value)}
            />
          </FormField>
          <FormField label="Scheduled at" htmlFor="match-scheduled-at">
            <TextInput
              id="match-scheduled-at"
              type="datetime-local"
              required
              value={values.scheduledAt}
              onChange={(event) => update("scheduledAt", event.target.value)}
            />
          </FormField>
          <FormField label="Stage" htmlFor="match-stage">
            <TextInput
              id="match-stage"
              value={values.stage}
              onChange={(event) => update("stage", event.target.value)}
            />
          </FormField>
          <FormField label="Round" htmlFor="match-round">
            <TextInput
              id="match-round"
              value={values.round}
              onChange={(event) => update("round", event.target.value)}
            />
          </FormField>
        </div>
        <div className="modal-actions">
          <button
            type="button"
            className="modal-cancel-button"
            onClick={closeModal}
          >
            Cancel
          </button>
          <SubmitButton variant="modal">Create match</SubmitButton>
        </div>
      </form>
    </Modal>
  );
}
