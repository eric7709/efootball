import { api } from "@/lib/api/axios";

import type { CompetitionTeamStatistics } from "../types.competition-team-statistics";

export const competitionTeamStatisticsRepository = {
  async list(): Promise<CompetitionTeamStatistics[]> {
    const response = await api.get<CompetitionTeamStatistics[]>("/competition-team-statistics");
    return response.data;
  },
  async getById(id: string): Promise<CompetitionTeamStatistics> {
    const response = await api.get<CompetitionTeamStatistics>(`/competition-team-statistics/${id}`);
    return response.data;
  },
  async recalculate(id: string): Promise<CompetitionTeamStatistics> {
    const response = await api.post<CompetitionTeamStatistics>(`/competition-team-statistics/${id}/recalculate`);
    return response.data;
  },
};
