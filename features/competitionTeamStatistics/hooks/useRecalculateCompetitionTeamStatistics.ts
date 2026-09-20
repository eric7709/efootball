import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import { competitionTeamStatisticsRepository } from "./api.competitionTeamStatistics";

export function useRecalculateCompetitionTeamStatistics() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => competitionTeamStatisticsRepository.recalculate(id),
    onSuccess: (statistics) => {
      queryClient.setQueryData(queryKeys.competitionTeamStatistics.detail(statistics.id), statistics);
      queryClient.invalidateQueries({ queryKey: queryKeys.competitionTeamStatistics.all });
    },
  });
}
