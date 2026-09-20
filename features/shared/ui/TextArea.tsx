type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export function TextArea(props: Props) {
  return <textarea {...props} style={{
    width: "100%", minHeight: 110, padding: "11px 12px", borderRadius: 9,
    border: "1px solid var(--border)", background: "var(--panel-2)", color: "var(--text)",
    resize: "vertical"
  }} />;
}
