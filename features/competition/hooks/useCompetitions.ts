import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { competitionRepository } from "./api.competition";

export function useCompetitions() {
  return useQuery({
    queryKey: queryKeys.competitions.all,
    queryFn: competitionRepository.list,
  });
}
