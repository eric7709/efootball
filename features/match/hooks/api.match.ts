import { api } from "@/lib/api/axios";

import type {
  CreateMatchInput,
  Match,
  UpdateMatchInput,
} from "../types.match";

export const matchRepository = {
  async list(): Promise<Match[]> {
    const response = await api.get<Match[]>("/matches");
    return response.data;
  },
  async getById(id: string): Promise<Match> {
    const response = await api.get<Match>(`/matches/${id}`);
    return response.data;
  },
  async listByCompetition(competitionId: string): Promise<Match[]> {
    const response = await api.get<Match[]>(`/competitions/${competitionId}/matches`);
    return response.data;
  },
  async create(input: CreateMatchInput): Promise<Match> {
    const response = await api.post<Match>("/matches", input);
    return response.data;
  },
  async update(id: string, input: UpdateMatchInput): Promise<Match> {
    const response = await api.patch<Match>(`/matches/${id}`, input);
    return response.data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/matches/${id}`);
  },
};
