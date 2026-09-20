import type{CompetitionStatus}from"../types.competition";export function CompetitionStatusBadge({status}:{status:CompetitionStatus}) {
  return <span>{status.replaceAll("_"," ")}</span>;
}
