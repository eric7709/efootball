type Props = React.InputHTMLAttributes<HTMLInputElement>;
export function TextInput(props: Props) {
  return <input {...props} style={{
    width: "100%", padding: "11px 12px", borderRadius: 9,
    border: "1px solid var(--border)", background: "var(--panel-2)", color: "var(--text)"
  }} />;
}
