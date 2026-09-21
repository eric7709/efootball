"use client";

import { ConfirmModal } from "@/features/shared/ui/ConfirmModal";
import { useCompetitionStore } from "@/features/competition/store.competition";

interface DeleteCompetitionModalProps {
  onDelete: (id: string) => void;
}

export function DeleteCompetitionModal({
  onDelete,
}: DeleteCompetitionModalProps) {
  const { modalType, selectedCompetition, closeModal } = useCompetitionStore();
  const isOpen = modalType === "delete" && selectedCompetition !== null;

  function handleDelete() {
    if (!selectedCompetition) return;
    onDelete(selectedCompetition.id);
    closeModal();
  }

  return (
    <ConfirmModal
      open={isOpen}
      title="Delete competition"
      message={`Delete ${selectedCompetition?.name ?? "this competition"}? This action cannot be undone.`}
      confirmLabel="Delete competition"
      onConfirm={handleDelete}
      onClose={closeModal}
    />
  );
}
