import { api } from "@/lib/api/axios";

import type {
  Ranking,
} from "../types.ranking";

export const rankingRepository = {
  async list(category?: Ranking["category"]): Promise<Ranking[]> {
    const response = await api.get<Ranking[]>("/rankings", { params: { category } });
    return response.data;
  },
  async getById(id: string): Promise<Ranking> {
    const response = await api.get<Ranking>(`/rankings/${id}`);
    return response.data;
  },
  async recalculate(): Promise<Ranking[]> {
    const response = await api.post<Ranking[]>("/rankings/recalculate");
    return response.data;
  },
};
