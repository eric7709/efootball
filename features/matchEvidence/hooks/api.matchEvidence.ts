import { api } from "@/lib/api/axios";

import type {
  MatchEvidence,
} from "../types.matchEvidence";

export const matchEvidenceRepository = {
  async list(): Promise<MatchEvidence[]> {
    const response = await api.get<MatchEvidence[]>("/match-evidence");
    return response.data;
  },
  async getById(id: string): Promise<MatchEvidence> {
    const response = await api.get<MatchEvidence>(`/match-evidence/${id}`);
    return response.data;
  },
  async listByMatch(matchId: string): Promise<MatchEvidence[]> {
    const response = await api.get<MatchEvidence[]>(`/matches/${matchId}/evidence`);
    return response.data;
  },
  async submit(input: SubmitMatchEvidenceInput): Promise<MatchEvidence> {
    const response = await api.post<MatchEvidence>("/match-evidence", input);
    return response.data;
  },
  async review(id: string, input: ReviewMatchEvidenceInput): Promise<MatchEvidence> {
    const response = await api.patch<MatchEvidence>(`/match-evidence/${id}/review`, input);
    return response.data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/match-evidence/${id}`);
  },
};
