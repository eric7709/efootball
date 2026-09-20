type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean };
export function SubmitButton({ children, loading, disabled, ...props }: Props) {
  return (
    <button type={props.type ?? "submit"} disabled={disabled || loading} {...props}
      style={{ padding: "11px 16px", border: 0, borderRadius: 9, background: "var(--primary)", color: "#fff" }}>
      {loading ? "Processing..." : children}
    </button>
  );
}
