"use client";

import { Modal } from "./Modal";

import { SubmitButton } from "./SubmitButton";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  loading?: boolean;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmModal({
  open,
  title,
  message,
  loading,
  confirmLabel = "Confirm",
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  return (
    <Modal open={open} title={title} onClose={onClose}>
      <p>{message}</p>
      <div className="modal-actions">
        <button type="button" className="modal-cancel-button" onClick={onClose}>
          Cancel
        </button>
        <SubmitButton
          type="button"
          variant="modal"
          loading={loading}
          onClick={onConfirm}
        >
          {confirmLabel}
        </SubmitButton>
      </div>
    </Modal>
  );
}
