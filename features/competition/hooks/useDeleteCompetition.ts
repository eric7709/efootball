import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { competitionRepository } from "../api/competition";

export function useDeleteCompetition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      return competitionRepository.delete(id);
    },

    onSuccess: ({ id }) => {
      queryClient.removeQueries({
        queryKey: queryKeys.competitions.detail(id),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.competitions.all,
      });
    },
  });
}
