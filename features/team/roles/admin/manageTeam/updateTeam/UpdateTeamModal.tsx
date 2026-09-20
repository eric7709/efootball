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

export function UpdateTeamModal({
  onUpdate,
}: UpdateTeamModalProps) {
  const {
    modalType,
    selectedTeam,
    closeModal,
  } = useTeamStore();

  const [values, setValues] = useState(() =>
    selectedTeam
      ? toValues(selectedTeam)
      : null
  );

  useEffect(() => {
    setValues(
      selectedTeam
        ? toValues(selectedTeam)
        : null
    );
  }, [selectedTeam]);

  if (!selectedTeam || !values) {
    return null;
  }

  const team = selectedTeam;
  const formValues = values;

  function update(
    key: keyof typeof formValues,
    value: string
  ) {
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

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const updatedTeam: Team = {
      ...team,

      name: formValues.name.trim(),

      tag: formValues.tag
        .trim()
        .toUpperCase(),

      country:
        formValues.country.trim(),

      region:
        formValues.region.trim() ||
        undefined,

      description:
        formValues.description.trim() ||
        undefined,

      

      strength:
        Number(formValues.strength),

     

      updatedAt:
        new Date().toISOString(),
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
      <form
        onSubmit={handleSubmit}
        className="w-full"
      >
        <div className="max-h-[65vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="Team Name"
              htmlFor="update-team-name"
            >
              <TextInput
                id="update-team-name"
                name="name"
                required
                value={formValues.name}
                onChange={(event) =>
                  update(
                    "name",
                    event.target.value
                  )
                }
              />
            </FormField>

            <FormField
              label="Tag"
              htmlFor="update-team-tag"
            >
              <TextInput
                id="update-team-tag"
                name="tag"
                required
                maxLength={5}
                value={formValues.tag}
                onChange={(event) =>
                  update(
                    "tag",
                    event.target.value
                  )
                }
              />
            </FormField>

            <FormField
              label="Country"
              htmlFor="update-team-country"
            >
              <TextInput
                id="update-team-country"
                name="country"
                required
                value={formValues.country}
                onChange={(event) =>
                  update(
                    "country",
                    event.target.value
                  )
                }
              />
            </FormField>

            <FormField
              label="Region"
              htmlFor="update-team-region"
            >
              <TextInput
                id="update-team-region"
                name="region"
                value={formValues.region}
                onChange={(event) =>
                  update(
                    "region",
                    event.target.value
                  )
                }
              />
            </FormField>
            <FormField
              label="Strength"
              htmlFor="update-team-strength"
            >
              <TextInput
                id="update-team-strength"
                name="strength"
                required
                type="number"
                min="0"
                value={formValues.strength}
                onChange={(event) =>
                  update(
                    "strength",
                    event.target.value
                  )
                }
              />
            </FormField>
          </div>
          <div className="pt-10 text-red-600">
            <FormField
              label="Description"
              htmlFor="update-team-description"
            >
              <TextArea
                id="update-team-description"
                name="description"
                rows={3}
                value={
                  formValues.description
                }
                onChange={(event) =>
                  update(
                    "description",
                    event.target.value
                  )
                }
              />
            </FormField>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2 border-t border-gray-200 pt-3">
          <button
            type="button"
            onClick={closeModal}
            className="rounded-lg border-2 border-gray-500 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <SubmitButton>
            Save Changes
          </SubmitButton>
        </div>
      </form>
    </Modal>
  );
}