import type{CompetitionType}from"../types.competition";export function CompetitionTypeBadge({type}:{type:CompetitionType}) {
  return <span>{type.replaceAll("_"," ")}</span>;
}
