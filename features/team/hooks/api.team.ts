import { api } from "@/lib/api/axios";

import type {
  CreateTeamInput,
  Team,
  UpdateTeamInput,
} from "../types.team";

export const teamRepository = {
  async list(): Promise<Team[]> {
    const response = await api.get<Team[]>("/teams");
    return response.data;
  },
  async getById(id: string): Promise<Team> {
    const response = await api.get<Team>(`/teams/${id}`);
    return response.data;
  },
  async create(input: CreateTeamInput): Promise<Team> {
    const response = await api.post<Team>("/teams", input);
    return response.data;
  },
  async update(id: string, input: UpdateTeamInput): Promise<Team> {
    const response = await api.patch<Team>(`/teams/${id}`, input);
    return response.data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/teams/${id}`);
  },
};
