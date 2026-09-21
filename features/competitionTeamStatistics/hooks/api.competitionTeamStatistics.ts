import { api } from "@/lib/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import type { CompetitionTeamStatistics } from "../types.competition-team-statistics";

export const competitionTeamStatisticsRepository = {
  async list(): Promise<CompetitionTeamStatistics[]> {
    const response = await api.get<CompetitionTeamStatistics[]>(
      "/competition-team-statistics",
    );
    return response.data;
  },
  async getById(id: string): Promise<CompetitionTeamStatistics> {
    const response = await api.get<CompetitionTeamStatistics>(
      `/competition-team-statistics/${id}`,
    );
    return response.data;
  },
  async recalculate(id: string): Promise<CompetitionTeamStatistics> {
    const response = await api.post<CompetitionTeamStatistics>(
      `/competition-team-statistics/${id}/recalculate`,
    );
    return response.data;
  },
};

export function useCompetitionTeamStatistics(id: string) {
  return useQuery({
    queryKey: queryKeys.competitionTeamStatistics.detail(id),
    queryFn: () => competitionTeamStatisticsRepository.getById(id),
    enabled: Boolean(id),
  });
}

export function useGetAllCompetitionTeamStatistics() {
  return useQuery({
    queryKey: queryKeys.competitionTeamStatistics.all,
    queryFn: competitionTeamStatisticsRepository.list,
  });
}

export function useRecalculateCompetitionTeamStatistics() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      competitionTeamStatisticsRepository.recalculate(id),
    onSuccess: (statistics) => {
      queryClient.setQueryData(
        queryKeys.competitionTeamStatistics.detail(statistics.id),
        statistics,
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.competitionTeamStatistics.all,
      });
    },
  });
}

export const useGetCompetitionTeamStatistics = useCompetitionTeamStatistics;
