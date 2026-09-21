"use client";

import { FormEvent, useEffect, useState } from "react";

import { FormField } from "@/features/shared/ui/FormField";
import { Modal } from "@/features/shared/ui/Modal";
import { SelectInput } from "@/features/shared/ui/SelectInput";
import { SubmitButton } from "@/features/shared/ui/SubmitButton";
import { TextArea } from "@/features/shared/ui/TextArea";
import { TextInput } from "@/features/shared/ui/TextInput";
import { useCompetitionStore } from "@/features/competition/store.competition";

import type {
  Competition,
  CompetitionType,
} from "@/features/competition/types.competition";

interface UpdateCompetitionModalProps {
  onUpdate: (competition: Competition) => void;
}

function toFormValues(competition: Competition) {
  return {
    name: competition.name,
    description: competition.description ?? "",
    year: String(competition.year),
    season: competition.season ?? "",
    type: competition.type,
    numberOfTeams: String(competition.numberOfTeams),
    platform: competition.platform,
    gameMode: competition.gameMode,
    location: competition.location ?? "",
    registrationStart: competition.registrationStart.slice(0, 10),
    registrationEnd: competition.registrationEnd.slice(0, 10),
    startDate: competition.startDate.slice(0, 10),
    endDate: competition.endDate.slice(0, 10),
    prizePool:
      competition.prizePool === undefined ? "" : String(competition.prizePool),
  };
}

export function UpdateCompetitionModal({
  onUpdate,
}: UpdateCompetitionModalProps) {
  const { modalType, selectedCompetition, closeModal } = useCompetitionStore();
  const [values, setValues] = useState(() =>
    selectedCompetition ? toFormValues(selectedCompetition) : null,
  );
  const isOpen = modalType === "update" && selectedCompetition !== null;

  useEffect(() => {
    setValues(selectedCompetition ? toFormValues(selectedCompetition) : null);
  }, [selectedCompetition]);

  if (!selectedCompetition || !values) return null;
  const competition: Competition = selectedCompetition;
  const formValues = values;

  function updateValue<Key extends keyof typeof formValues>(
    key: Key,
    value: (typeof formValues)[Key],
  ) {
    setValues((current) => (current ? { ...current, [key]: value } : current));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onUpdate({
      ...competition,
      name: formValues.name.trim(),
      description: formValues.description.trim() || undefined,
      year: Number(formValues.year),
      season: formValues.season.trim() || undefined,
      type: formValues.type,
      numberOfTeams: Number(formValues.numberOfTeams),
      platform: formValues.platform,
      gameMode: formValues.gameMode.trim(),
      location: formValues.location.trim() || undefined,
      registrationStart: formValues.registrationStart,
      registrationEnd: formValues.registrationEnd,
      startDate: formValues.startDate,
      endDate: formValues.endDate,
      prizePool: formValues.prizePool
        ? Number(formValues.prizePool)
        : undefined,
      updatedAt: new Date().toISOString(),
    });
    closeModal();
  }

  return (
    <Modal open={isOpen} title="Update competition" onClose={closeModal}>
      <form className="grid" onSubmit={handleSubmit}>
        <div className="grid grid-2">
          <FormField label="Name" htmlFor="update-name">
            <TextInput
              id="update-name"
              required
              value={values.name}
              onChange={(event) => updateValue("name", event.target.value)}
            />
          </FormField>
          <FormField label="Year" htmlFor="update-year">
            <TextInput
              id="update-year"
              required
              type="number"
              min="2000"
              value={values.year}
              onChange={(event) => updateValue("year", event.target.value)}
            />
          </FormField>
          <FormField label="Type" htmlFor="update-type">
            <SelectInput
              id="update-type"
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
          <FormField label="Teams" htmlFor="update-teams">
            <TextInput
              id="update-teams"
              required
              type="number"
              min="2"
              value={values.numberOfTeams}
              onChange={(event) =>
                updateValue("numberOfTeams", event.target.value)
              }
            />
          </FormField>
          <FormField label="Platform" htmlFor="update-platform">
            <SelectInput
              id="update-platform"
              value={values.platform}
              onChange={(event) =>
                updateValue(
                  "platform",
                  event.target.value as Competition["platform"],
                )
              }
            >
              <option value="MOBILE">Mobile</option>
              <option value="PLAYSTATION">PlayStation</option>
              <option value="XBOX">Xbox</option>
              <option value="PC">PC</option>
            </SelectInput>
          </FormField>
          <FormField label="Game mode" htmlFor="update-game-mode">
            <TextInput
              id="update-game-mode"
              required
              value={values.gameMode}
              onChange={(event) => updateValue("gameMode", event.target.value)}
            />
          </FormField>
          <FormField
            label="Registration starts"
            htmlFor="update-registration-start"
          >
            <TextInput
              id="update-registration-start"
              required
              type="date"
              value={values.registrationStart}
              onChange={(event) =>
                updateValue("registrationStart", event.target.value)
              }
            />
          </FormField>
          <FormField
            label="Registration ends"
            htmlFor="update-registration-end"
          >
            <TextInput
              id="update-registration-end"
              required
              type="date"
              value={values.registrationEnd}
              onChange={(event) =>
                updateValue("registrationEnd", event.target.value)
              }
            />
          </FormField>
          <FormField label="Starts" htmlFor="update-start-date">
            <TextInput
              id="update-start-date"
              required
              type="date"
              value={values.startDate}
              onChange={(event) => updateValue("startDate", event.target.value)}
            />
          </FormField>
          <FormField label="Ends" htmlFor="update-end-date">
            <TextInput
              id="update-end-date"
              required
              type="date"
              value={values.endDate}
              onChange={(event) => updateValue("endDate", event.target.value)}
            />
          </FormField>
          <FormField label="Season" htmlFor="update-season">
            <TextInput
              id="update-season"
              value={values.season}
              onChange={(event) => updateValue("season", event.target.value)}
            />
          </FormField>
          <FormField label="Location" htmlFor="update-location">
            <TextInput
              id="update-location"
              value={values.location}
              onChange={(event) => updateValue("location", event.target.value)}
            />
          </FormField>
          <FormField label="Prize pool" htmlFor="update-prize-pool">
            <TextInput
              id="update-prize-pool"
              type="number"
              min="0"
              value={values.prizePool}
              onChange={(event) => updateValue("prizePool", event.target.value)}
            />
          </FormField>
        </div>
        <FormField label="Description" htmlFor="update-description">
          <TextArea
            id="update-description"
            value={values.description}
            onChange={(event) => updateValue("description", event.target.value)}
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
          <SubmitButton variant="modal">Save changes</SubmitButton>
        </div>
      </form>
    </Modal>
  );
}
