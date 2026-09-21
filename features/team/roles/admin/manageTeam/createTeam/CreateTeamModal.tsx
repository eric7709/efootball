"use client";

import { FormEvent, useState } from "react";

import { FormField } from "@/features/shared/ui/FormField";
import { Modal } from "@/features/shared/ui/Modal";
import { SubmitButton } from "@/features/shared/ui/SubmitButton";
import { TextArea } from "@/features/shared/ui/TextArea";
import { TextInput } from "@/features/shared/ui/TextInput";
import { useTeamStore } from "@/features/team/store.team";

import type { Team } from "@/features/team/types.team";

interface CreateTeamModalProps {
  onCreate: (team: Team) => void;
}

const initialValues = {
  name: "",
  tag: "",
  country: "",
  region: "",
  description: "",
  captainId: "",
  managerId: "",
};

export function CreateTeamModal({ onCreate }: CreateTeamModalProps) {
  const { modalType, closeModal } = useTeamStore();
  const [values, setValues] = useState(initialValues);
  const isOpen = modalType === "create";
  const update = (key: keyof typeof values, value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const timestamp = new Date().toISOString();
    onCreate({
      id: `team-${Date.now()}`,
      name: values.name.trim(),
      tag: values.tag.trim().toUpperCase(),
      country: values.country.trim(),
      region: values.region.trim() || undefined,
      description: values.description.trim() || undefined,
      strength: 0,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    setValues(initialValues);
    closeModal();
  }

  return (
    <Modal open={isOpen} title="Create team" onClose={closeModal}>
      <form className="grid" onSubmit={handleSubmit}>
        <div className="grid grid-2">
          <FormField label="Team name" htmlFor="team-name">
            <TextInput
              id="team-name"
              required
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
            />
          </FormField>
          <FormField label="Tag" htmlFor="team-tag">
            <TextInput
              id="team-tag"
              required
              maxLength={5}
              value={values.tag}
              onChange={(event) => update("tag", event.target.value)}
            />
          </FormField>
          <FormField label="Country" htmlFor="team-country">
            <TextInput
              id="team-country"
              required
              value={values.country}
              onChange={(event) => update("country", event.target.value)}
            />
          </FormField>
          <FormField label="Region" htmlFor="team-region">
            <TextInput
              id="team-region"
              value={values.region}
              onChange={(event) => update("region", event.target.value)}
            />
          </FormField>
          <FormField label="Captain ID" htmlFor="team-captain">
            <TextInput
              id="team-captain"
              required
              value={values.captainId}
              onChange={(event) => update("captainId", event.target.value)}
            />
          </FormField>
          <FormField label="Manager ID" htmlFor="team-manager">
            <TextInput
              id="team-manager"
              value={values.managerId}
              onChange={(event) => update("managerId", event.target.value)}
            />
          </FormField>
        </div>
        <FormField label="Description" htmlFor="team-description">
          <TextArea
            id="team-description"
            value={values.description}
            onChange={(event) => update("description", event.target.value)}
          />
        </FormField>
        <div className="modal-actions">
          <button
            type="button"
            className="modal-cancel-button"
            onClick={closeModal}
          >
            Cancel
          </button>
          <SubmitButton variant="modal">Create team</SubmitButton>
        </div>
      </form>
    </Modal>
  );
}
