import { api } from "@/lib/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import type { CreateTeamInput, Team, UpdateTeamInput } from "../types.team";

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

export function useTeam(id: string) {
  return useQuery({
    queryKey: queryKeys.teams.detail(id),
    queryFn: () => teamRepository.getById(id),
    enabled: Boolean(id),
  });
}

export function useTeams() {
  return useQuery({
    queryKey: queryKeys.teams.all,
    queryFn: teamRepository.list,
  });
}

export function useCreateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateTeamInput) => teamRepository.create(input),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.teams.all }),
  });
}

export function useDeleteTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => teamRepository.delete(id),
    onSuccess: (_result, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.teams.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.teams.all });
    },
  });
}

export function useUpdateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateTeamInput }) =>
      teamRepository.update(id, input),
    onSuccess: (team) => {
      queryClient.setQueryData(queryKeys.teams.detail(team.id), team);
      queryClient.invalidateQueries({ queryKey: queryKeys.teams.all });
    },
  });
}

export const useGetAllTeams = useTeams;
export const useGetTeam = useTeam;
