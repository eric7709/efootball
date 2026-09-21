import { api } from "@/lib/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

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
  async update(
    id: string,
    input: UpdateCompetitionInput,
  ): Promise<Competition> {
    const response = await api.patch<Competition>(`/competitions/${id}`, input);
    return response.data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/competitions/${id}`);
  },
};

export function useCompetition(id: string) {
  return useQuery({
    queryKey: queryKeys.competitions.detail(id),
    queryFn: () => competitionRepository.getById(id),
    enabled: Boolean(id),
  });
}

export function useCompetitions() {
  return useQuery({
    queryKey: queryKeys.competitions.all,
    queryFn: competitionRepository.list,
  });
}

export function useCreateCompetition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateCompetitionInput) =>
      competitionRepository.create(input),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.competitions.all }),
  });
}

export function useDeleteCompetition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => competitionRepository.delete(id),
    onSuccess: (_result, id) => {
      queryClient.removeQueries({
        queryKey: queryKeys.competitions.detail(id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.competitions.all });
    },
  });
}

export function useGetAllCompetitions() {
  return useQuery({
    queryKey: queryKeys.competitions.all,
    queryFn: competitionRepository.list,
  });
}

export function useUpdateCompetition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: UpdateCompetitionInput;
    }) => competitionRepository.update(id, input),
    onSuccess: (competition) => {
      queryClient.setQueryData(
        queryKeys.competitions.detail(competition.id),
        competition,
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.competitions.all });
    },
  });
}

export const useGetCompetition = useCompetition;
