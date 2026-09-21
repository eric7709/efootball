type Props = {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
};

export function FormField({ label, htmlFor, hint, error, children }: Props) {
  return (
    <div style={{ display: "grid", gap: 7 }}>
      <label htmlFor={htmlFor} style={{ fontSize: 13, fontWeight: 700 }}>
        {label}
      </label>
      {children}
      {hint && !error ? (
        <small style={{ color: "var(--muted)" }}>{hint}</small>
      ) : null}
      {error ? <small style={{ color: "var(--danger)" }}>{error}</small> : null}
    </div>
  );
}
