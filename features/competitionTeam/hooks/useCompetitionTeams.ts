import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { competitionTeamRepository } from "./api.competitionTeam";

export function useCompetitionTeams(competitionId:string) {
  return useQuery({
    queryKey: queryKeys.competitionTeams.byCompetition(competitionId),
    queryFn: ()=>competitionTeamRepository.listByCompetition(competitionId),
    enabled: Boolean(competitionId),,
  });
}
