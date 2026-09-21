import { api } from "@/lib/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

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
    const response = await api.get<CompetitionTeam[]>(
      `/competitions/${competitionId}/teams`,
    );
    return response.data;
  },
  async listByTeam(teamId: string): Promise<CompetitionTeam[]> {
    const response = await api.get<CompetitionTeam[]>(
      `/teams/${teamId}/competitions`,
    );
    return response.data;
  },
  async register(
    input: RegisterCompetitionTeamInput,
  ): Promise<CompetitionTeam> {
    const response = await api.post<CompetitionTeam>(
      "/competition-teams",
      input,
    );
    return response.data;
  },
  async update(
    id: string,
    input: UpdateCompetitionTeamInput,
  ): Promise<CompetitionTeam> {
    const response = await api.patch<CompetitionTeam>(
      `/competition-teams/${id}`,
      input,
    );
    return response.data;
  },
  async withdraw(id: string): Promise<CompetitionTeam> {
    const response = await api.patch<CompetitionTeam>(
      `/competition-teams/${id}/withdraw`,
    );
    return response.data;
  },
};

export function useCompetitionTeams(competitionId: string) {
  return useQuery({
    queryKey: queryKeys.competitionTeams.byCompetition(competitionId),
    queryFn: () => competitionTeamRepository.listByCompetition(competitionId),
    enabled: Boolean(competitionId),
  });
}

export function useRegisterCompetitionTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: RegisterCompetitionTeamInput) =>
      competitionTeamRepository.register(input),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.competitionTeams.byCompetition(
          result.competitionId,
        ),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.competitionTeams.byTeam(result.teamId),
      });
    },
  });
}

export function useUpdateCompetitionTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: UpdateCompetitionTeamInput;
    }) => competitionTeamRepository.update(id, input),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.competitionTeams.byCompetition(
          result.competitionId,
        ),
      });
    },
  });
}

export function useWithdrawCompetitionTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (competitionTeam: CompetitionTeam) =>
      competitionTeamRepository.withdraw(competitionTeam.id),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.competitionTeams.byCompetition(
          result.competitionId,
        ),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.competitionTeams.byTeam(result.teamId),
      });
    },
  });
}

export const useGetAllCompetitionTeams = useCompetitionTeams;
