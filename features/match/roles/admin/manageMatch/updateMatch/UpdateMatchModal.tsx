"use client";

import { FormEvent, useEffect, useState } from "react";

import { FormField } from "@/features/shared/ui/FormField";
import { Modal } from "@/features/shared/ui/Modal";
import { SubmitButton } from "@/features/shared/ui/SubmitButton";
import { TextInput } from "@/features/shared/ui/TextInput";
import { useMatchStore } from "@/features/match/store.match";

import type { Match, MatchStatus } from "@/features/match/types.match";

interface UpdateMatchModalProps {
  onUpdate: (match: Match) => void;
}

function toValues(match: Match) {
  return {
    homeTeamId: match.homeTeamId,
    awayTeamId: match.awayTeamId,
    stage: match.stage ?? "",
    round: match.round ?? "",
    scheduledAt: match.scheduledAt,
    homeScore: match.homeScore === undefined ? "" : String(match.homeScore),
    awayScore: match.awayScore === undefined ? "" : String(match.awayScore),
    status: match.status,
  };
}

type MatchFormValues = ReturnType<typeof toValues>;

export function UpdateMatchModal({ onUpdate }: UpdateMatchModalProps) {
  const { modalType, selectedMatch, closeModal } = useMatchStore();
  const [values, setValues] = useState<MatchFormValues | null>(() =>
    selectedMatch ? toValues(selectedMatch) : null,
  );

  useEffect(() => {
    setValues(selectedMatch ? toValues(selectedMatch) : null);
  }, [selectedMatch]);

  if (!selectedMatch || !values) {
    return null;
  }

  const match = selectedMatch;
  const formValues = values;

  function update(key: keyof MatchFormValues, value: string) {
    setValues((current) => (current ? { ...current, [key]: value } : current));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const updatedMatch: Match = {
      ...match,
      homeTeamId: formValues.homeTeamId.trim(),
      awayTeamId: formValues.awayTeamId.trim(),
      stage: formValues.stage.trim() || undefined,
      round: formValues.round.trim() || undefined,
      scheduledAt: formValues.scheduledAt,
      homeScore:
        formValues.homeScore === "" ? undefined : Number(formValues.homeScore),
      awayScore:
        formValues.awayScore === "" ? undefined : Number(formValues.awayScore),
      status: formValues.status,
    };

    onUpdate(updatedMatch);
    closeModal();
  }

  return (
    <Modal
      open={modalType === "update"}
      title="Update match"
      onClose={closeModal}
    >
      <form className="grid" onSubmit={handleSubmit}>
        <div className="grid grid-2">
          <FormField label="Home team ID" htmlFor="update-match-home-team">
            <TextInput
              id="update-match-home-team"
              required
              value={formValues.homeTeamId}
              onChange={(event) => update("homeTeamId", event.target.value)}
            />
          </FormField>
          <FormField label="Away team ID" htmlFor="update-match-away-team">
            <TextInput
              id="update-match-away-team"
              required
              value={formValues.awayTeamId}
              onChange={(event) => update("awayTeamId", event.target.value)}
            />
          </FormField>
          <FormField label="Scheduled at" htmlFor="update-match-scheduled-at">
            <TextInput
              id="update-match-scheduled-at"
              type="datetime-local"
              required
              value={formValues.scheduledAt}
              onChange={(event) => update("scheduledAt", event.target.value)}
            />
          </FormField>
          <FormField label="Status" htmlFor="update-match-status">
            <select
              id="update-match-status"
              value={formValues.status}
              onChange={(event) => update("status", event.target.value)}
            >
              {(
                [
                  "SCHEDULED",
                  "ONGOING",
                  "COMPLETED",
                  "CANCELLED",
                ] as MatchStatus[]
              ).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Home score" htmlFor="update-match-home-score">
            <TextInput
              id="update-match-home-score"
              type="number"
              min="0"
              value={formValues.homeScore}
              onChange={(event) => update("homeScore", event.target.value)}
            />
          </FormField>
          <FormField label="Away score" htmlFor="update-match-away-score">
            <TextInput
              id="update-match-away-score"
              type="number"
              min="0"
              value={formValues.awayScore}
              onChange={(event) => update("awayScore", event.target.value)}
            />
          </FormField>
          <FormField label="Stage" htmlFor="update-match-stage">
            <TextInput
              id="update-match-stage"
              value={formValues.stage}
              onChange={(event) => update("stage", event.target.value)}
            />
          </FormField>
          <FormField label="Round" htmlFor="update-match-round">
            <TextInput
              id="update-match-round"
              value={formValues.round}
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
          <SubmitButton variant="modal">Save changes</SubmitButton>
        </div>
      </form>
    </Modal>
  );
}
