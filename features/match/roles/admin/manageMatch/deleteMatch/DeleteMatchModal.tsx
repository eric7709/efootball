"use client";

import { ConfirmModal } from "@/features/shared/ui/ConfirmModal";
import { useMatchStore } from "@/features/match/store.match";

interface DeleteMatchModalProps {
  onDelete: (id: string) => void;
}

export function DeleteMatchModal({ onDelete }: DeleteMatchModalProps) {
  const { modalType, selectedMatch, closeModal } = useMatchStore();

  function handleDelete() {
    if (!selectedMatch) {
      return;
    }

    onDelete(selectedMatch.id);
    closeModal();
  }

  return (
    <ConfirmModal
      open={modalType === "delete" && selectedMatch !== null}
      title="Delete match"
      message={`Delete this match? This action cannot be undone.`}
      confirmLabel="Delete match"
      onConfirm={handleDelete}
      onClose={closeModal}
    />
  );
}
