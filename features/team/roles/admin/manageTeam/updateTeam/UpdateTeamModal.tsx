"use client";

import { FormEvent, useEffect, useState } from "react";
import { FormField } from "@/features/shared/ui/FormField";
import { Modal } from "@/features/shared/ui/Modal";
import { SubmitButton } from "@/features/shared/ui/SubmitButton";
import { TextArea } from "@/features/shared/ui/TextArea";
import { TextInput } from "@/features/shared/ui/TextInput";
import { useTeamStore } from "@/features/team/store.team";
import type { Team } from "@/features/team/types.team";

interface UpdateTeamModalProps {
  onUpdate: (team: Team) => void;
}

function toValues(team: Team) {
  return {
    name: team.name,
    tag: team.tag,
    country: team.country,
    region: team.region ?? "",
    description: team.description ?? "",
    strength: String(team.strength),
  };
}

export function UpdateTeamModal({ onUpdate }: UpdateTeamModalProps) {
  const { modalType, selectedTeam, closeModal } = useTeamStore();

  const [values, setValues] = useState(() =>
    selectedTeam ? toValues(selectedTeam) : null,
  );

  useEffect(() => {
    setValues(selectedTeam ? toValues(selectedTeam) : null);
  }, [selectedTeam]);

  if (!selectedTeam || !values) {
    return null;
  }

  const team = selectedTeam;
  const formValues = values;

  function update(key: keyof typeof formValues, value: string) {
    setValues((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        [key]: value,
      };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const updatedTeam: Team = {
      ...team,

      name: formValues.name.trim(),

      tag: formValues.tag.trim().toUpperCase(),

      country: formValues.country.trim(),

      region: formValues.region.trim() || undefined,

      description: formValues.description.trim() || undefined,

      strength: Number(formValues.strength),

      updatedAt: new Date().toISOString(),
    };

    onUpdate(updatedTeam);

    closeModal();
  }

  return (
    <Modal
      open={modalType === "update"}
      title="Update Team"
      onClose={closeModal}
    >
      <form onSubmit={handleSubmit} className="grid">
        <div className="grid grid-2">
          <FormField label="Team Name" htmlFor="update-team-name">
            <TextInput
              id="update-team-name"
              name="name"
              required
              value={formValues.name}
              onChange={(event) => update("name", event.target.value)}
            />
          </FormField>

          <FormField label="Tag" htmlFor="update-team-tag">
            <TextInput
              id="update-team-tag"
              name="tag"
              required
              maxLength={5}
              value={formValues.tag}
              onChange={(event) => update("tag", event.target.value)}
            />
          </FormField>

          <FormField label="Country" htmlFor="update-team-country">
            <TextInput
              id="update-team-country"
              name="country"
              required
              value={formValues.country}
              onChange={(event) => update("country", event.target.value)}
            />
          </FormField>

          <FormField label="Region" htmlFor="update-team-region">
            <TextInput
              id="update-team-region"
              name="region"
              value={formValues.region}
              onChange={(event) => update("region", event.target.value)}
            />
          </FormField>
          <FormField label="Strength" htmlFor="update-team-strength">
            <TextInput
              id="update-team-strength"
              name="strength"
              required
              type="number"
              min="0"
              value={formValues.strength}
              onChange={(event) => update("strength", event.target.value)}
            />
          </FormField>
        </div>

        <FormField label="Description" htmlFor="update-team-description">
          <TextArea
            id="update-team-description"
            name="description"
            rows={3}
            value={formValues.description}
            onChange={(event) => update("description", event.target.value)}
          />
        </FormField>

        <div className="modal-actions">
          <button
            type="button"
            onClick={closeModal}
            className="modal-cancel-button"
          >
            Cancel
          </button>

          <SubmitButton variant="modal">Save Changes</SubmitButton>
        </div>
      </form>
    </Modal>
  );
}
