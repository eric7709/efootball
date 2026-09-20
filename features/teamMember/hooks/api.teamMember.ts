import { api } from "@/lib/api/axios";

import type {
  AddTeamMemberInput,
  TeamMember,
  UpdateTeamMemberInput,
} from "../types.team-member";

export const teamMemberRepository = {
  async list(): Promise<TeamMember[]> {
    const response = await api.get<TeamMember[]>("/team-members");
    return response.data;
  },
  async getById(id: string): Promise<TeamMember> {
    const response = await api.get<TeamMember>(`/team-members/${id}`);
    return response.data;
  },
  async listByTeam(teamId: string): Promise<TeamMember[]> {
    const response = await api.get<TeamMember[]>(`/teams/${teamId}/members`);
    return response.data;
  },
  async listByPlayer(playerId: string): Promise<TeamMember[]> {
    const response = await api.get<TeamMember[]>(`/players/${playerId}/teams`);
    return response.data;
  },
  async add(input: AddTeamMemberInput): Promise<TeamMember> {
    const response = await api.post<TeamMember>("/team-members", input);
    return response.data;
  },
  async update(id: string, input: UpdateTeamMemberInput): Promise<TeamMember> {
    const response = await api.patch<TeamMember>(`/team-members/${id}`, input);
    return response.data;
  },
  async remove(id: string): Promise<void> {
    await api.delete(`/team-members/${id}`);
  },
};
