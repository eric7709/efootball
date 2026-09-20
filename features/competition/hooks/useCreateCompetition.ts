import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { competitionRepository } from "../api/competition";

import type { CreateCompetitionInput } from "../types.competition";

export function useCreateCompetition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateCompetitionInput) => {
      return competitionRepository.create(input);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.competitions.all,
      });
    },
  });
}
