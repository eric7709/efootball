import { api } from "@/lib/api/axios";

import type {
  PlayerStatistics,
} from "../types.playerStatistics";

export const playerStatisticsRepository = {
  async list(): Promise<PlayerStatistics[]> {
    const response = await api.get<PlayerStatistics[]>("/player-statistics");
    return response.data;
  },
  async getByPlayer(id: string): Promise<PlayerStatistics> {
    const response = await api.get<PlayerStatistics>(`/player-statistics/${id}`);
    return response.data;
  },
  async recalculate(id: string): Promise<PlayerStatistics> {
    const response = await api.post<PlayerStatistics>(`/player-statistics/${id}/recalculate`);
    return response.data;
  },
};
