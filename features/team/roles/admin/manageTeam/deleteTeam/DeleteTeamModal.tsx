"use client";

import { ConfirmModal } from "@/features/shared/ui/ConfirmModal";
import { useTeamStore } from "@/features/team/store.team";

interface DeleteTeamModalProps {
  onDelete: (id: string) => void;
}

export function DeleteTeamModal({ onDelete }: DeleteTeamModalProps) {
  const { modalType, selectedTeam, closeModal } = useTeamStore();
  function handleDelete() {
    if (!selectedTeam) return;
    onDelete(selectedTeam.id);
    closeModal();
  }
  return (
    <ConfirmModal
      open={modalType === "delete" && selectedTeam !== null}
      title="Delete team"
      message={`Delete ${selectedTeam?.name ?? "this team"}? This action cannot be undone.`}
      confirmLabel="Delete team"
      onConfirm={handleDelete}
      onClose={closeModal}
    />
  );
}
