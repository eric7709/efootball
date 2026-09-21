type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: "default" | "modal";
};
export function SubmitButton({
  children,
  loading,
  disabled,
  variant = "default",
  className,
  ...props
}: Props) {
  return (
    <button
      type={props.type ?? "submit"}
      disabled={disabled || loading}
      className={[variant === "modal" ? "modal-submit-button" : "", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
      style={
        variant === "default"
          ? {
              padding: "11px 16px",
              border: 0,
              borderRadius: 9,
              background: "var(--primary)",
              color: "#fff",
            }
          : undefined
      }
    >
      {loading ? "Processing..." : children}
    </button>
  );
}
