"use client";

interface AdminPageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  onAction,
}: AdminPageHeaderProps) {
  return (
    <header className="admin-page-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="muted">{description}</p>
      </div>
      {actionLabel && onAction ? (
        <button type="button" className="button primary" onClick={onAction}>
          + {actionLabel}
        </button>
      ) : null}
    </header>
  );
}
