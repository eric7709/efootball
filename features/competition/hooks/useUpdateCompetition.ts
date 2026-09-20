import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { competitionRepository } from "../api/competition";

import type { UpdateCompetitionInput } from "../types.competition";

interface UpdateCompetitionVariables {
  id: string;
  input: UpdateCompetitionInput;
}

export function useUpdateCompetition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: UpdateCompetitionVariables) => {
      return competitionRepository.update(id, input);
    },

    onSuccess: (competition) => {
      queryClient.setQueryData(
        queryKeys.competitions.detail(competition.id),
        competition
      );

      queryClient.invalidateQueries({
        queryKey: queryKeys.competitions.all,
      });
    },
  });
}
