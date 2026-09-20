import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { playerRepository } from "./api.player";

export function useDeletePlayer() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => playerRepository.delete(id),
    onSuccess: ({ id }) => {
      client.removeQueries({ queryKey: queryKeys.players.detail(id) });
      client.invalidateQueries({ queryKey: queryKeys.players.all });
    },
  });
}
