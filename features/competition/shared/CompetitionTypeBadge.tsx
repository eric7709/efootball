import type { CompetitionType } from "../types.competition";
export function CompetitionTypeBadge({ type }: { type: CompetitionType }) {
  return (
    <span
      className={`competition-type-badge competition-type-${type.toLowerCase().replaceAll("_", "-")}`}
    >
      {type.replaceAll("_", " ")}
    </span>
  );
}
