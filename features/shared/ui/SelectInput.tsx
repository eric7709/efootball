type Props = React.SelectHTMLAttributes<HTMLSelectElement>;
export function SelectInput(props: Props) {
  return (
    <select
      {...props}
      style={{
        width: "100%",
        padding: "11px 12px",
        borderRadius: 9,
        border: "1px solid var(--border)",
        background: "var(--panel-2)",
        color: "var(--text)",
      }}
    />
  );
}
