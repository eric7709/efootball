import type { CompetitionStatus } from "../types.competition";
export function CompetitionStatusBadge({
  status,
}: {
  status: CompetitionStatus;
}) {
  return (
    <span
      className={`competition-status-badge competition-status-${status.toLowerCase().replaceAll("_", "-")}`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
