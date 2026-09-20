import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { competitionTeamStatisticsRepository } from "./api.competitionTeamStatistics";

export function useGetAllCompetitionTeamStatistics() {
  return useQuery({
    queryKey: queryKeys.competitionTeamStatistics.all,
    queryFn: () => competitionTeamStatisticsRepository.list(),
  });
}
