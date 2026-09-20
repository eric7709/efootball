import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { competitionTeamStatisticsRepository } from "./api.competitionTeamStatistics";

export function useCompetitionTeamStatistics(id: string) {
  return useQuery({
    queryKey: queryKeys.competitionTeamStatistics.detail(id),
    queryFn: () => competitionTeamStatisticsRepository.getById(id),
    enabled: Boolean(id),
  });
}
