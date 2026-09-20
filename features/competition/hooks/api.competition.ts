import { api } from "@/lib/api/axios";

import type {
  Competition,
  CreateCompetitionInput,
  UpdateCompetitionInput,
} from "../types.competition";

export const competitionRepository = {
  async list(): Promise<Competition[]> {
    const response = await api.get<Competition[]>("/competitions");
    return response.data;
  },
  async getById(id: string): Promise<Competition> {
    const response = await api.get<Competition>(`/competitions/${id}`);
    return response.data;
  },
  async create(input: CreateCompetitionInput): Promise<Competition> {
    const response = await api.post<Competition>("/competitions", input);
    return response.data;
  },
  async update(id: string, input: UpdateCompetitionInput): Promise<Competition> {
    const response = await api.patch<Competition>(`/competitions/${id}`, input);
    return response.data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/competitions/${id}`);
  },
};
