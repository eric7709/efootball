import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { playerRepository } from "./api.player";

import type { UpdatePlayerInput } from "../types.player";

export function useUpdatePlayer() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdatePlayerInput }) => playerRepository.update(id, input),
    onSuccess: (player) => {
      client.setQueryData(queryKeys.players.detail(player.id), player);
      client.invalidateQueries({ queryKey: queryKeys.players.all });
    },
  });
}
