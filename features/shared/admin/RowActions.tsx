"use client";

interface RowActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export function RowActions({ onEdit, onDelete }: RowActionsProps) {
  return (
    <div className="row-actions">
      {onEdit ? <button type="button" className="table-action table-action-edit" onClick={onEdit}>Edit</button> : null}
      {onDelete ? <button type="button" className="table-action table-action-delete" onClick={onDelete}>Delete</button> : null}
    </div>
  );
}
