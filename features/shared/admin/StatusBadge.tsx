export function StatusBadge({ value }: { value: string }) {
  return <span className="status-badge">{value.replaceAll("_", " ")}</span>;
}
