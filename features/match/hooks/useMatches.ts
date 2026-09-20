import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { matchRepository } from "./api.match";

export function useMatches(competitionId?:string) {
  return useQuery({
    queryKey: competitionId?queryKeys.competitions.matches(competitionId):queryKeys.matches.all,
    queryFn: ()=>competitionId?matchRepository.listByCompetition(competitionId):matchRepository.list(),
  });
}
