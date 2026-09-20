import { api } from "@/lib/api/axios";

import type {
  CompetitionTeam,
  RegisterCompetitionTeamInput,
  UpdateCompetitionTeamInput,
} from "../types.competition-team";

export const competitionTeamRepository = {
  async list(): Promise<CompetitionTeam[]> {
    const response = await api.get<CompetitionTeam[]>("/competition-teams");
    return response.data;
  },
  async getById(id: string): Promise<CompetitionTeam> {
    const response = await api.get<CompetitionTeam>(`/competition-teams/${id}`);
    return response.data;
  },
  async listByCompetition(competitionId: string): Promise<CompetitionTeam[]> {
    const response = await api.get<CompetitionTeam[]>(`/competitions/${competitionId}/teams`);
    return response.data;
  },
  async listByTeam(teamId: string): Promise<CompetitionTeam[]> {
    const response = await api.get<CompetitionTeam[]>(`/teams/${teamId}/competitions`);
    return response.data;
  },
  async register(input: RegisterCompetitionTeamInput): Promise<CompetitionTeam> {
    const response = await api.post<CompetitionTeam>("/competition-teams", input);
    return response.data;
  },
  async update(id: string, input: UpdateCompetitionTeamInput): Promise<CompetitionTeam> {
    const response = await api.patch<CompetitionTeam>(`/competition-teams/${id}`, input);
    return response.data;
  },
  async withdraw(id: string): Promise<CompetitionTeam> {
    const response = await api.patch<CompetitionTeam>(`/competition-teams/${id}/withdraw`);
    return response.data;
  },
};
