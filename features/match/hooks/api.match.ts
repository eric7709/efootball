import { api } from "@/lib/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import type { CreateMatchInput, Match, UpdateMatchInput } from "../types.match";

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
    const response = await api.get<Match[]>(
      `/competitions/${competitionId}/matches`,
    );
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

export function useMatch(id: string) {
  return useQuery({
    queryKey: queryKeys.matches.detail(id),
    queryFn: () => matchRepository.getById(id),
    enabled: Boolean(id),
  });
}

export function useMatches(competitionId?: string) {
  return useQuery({
    queryKey: competitionId
      ? queryKeys.competitions.matches(competitionId)
      : queryKeys.matches.all,
    queryFn: () =>
      competitionId
        ? matchRepository.listByCompetition(competitionId)
        : matchRepository.list(),
  });
}

export function useCreateMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateMatchInput) => matchRepository.create(input),
    onSuccess: (match) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.matches.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.competitions.matches(match.competitionId as string),
      });
    },
  });
}

export function useDeleteMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (match: { id: string; competitionId: string }) =>
      matchRepository.delete(match.id),
    onSuccess: (_result, match) => {
      queryClient.removeQueries({
        queryKey: queryKeys.matches.detail(match.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.matches.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.competitions.matches(match.competitionId),
      });
    },
  });
}

export function useUpdateMatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateMatchInput }) =>
      matchRepository.update(id, input),
    onSuccess: (match) => {
      queryClient.setQueryData(queryKeys.matches.detail(match.id), match);
      queryClient.invalidateQueries({ queryKey: queryKeys.matches.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.competitions.matches(match.competitionId as string),
      });
    },
  });
}

export const useGetAllMatches = useMatches;
export const useGetMatch = useMatch;
