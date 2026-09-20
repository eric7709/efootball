import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { playerRepository } from "./api.player";

import type { CreatePlayerInput } from "../types.player";

export function useCreatePlayer() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (input: CreatePlayerInput) => playerRepository.create(input),
    onSuccess: () => client.invalidateQueries({ queryKey: queryKeys.players.all }),
  });
}
