import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { playerRepository } from "./api.player";

export function usePlayer(id: string) {
  return useQuery({
    queryKey: queryKeys.players.detail(id),
    queryFn: () => playerRepository.getById(id),
    enabled: Boolean(id),
  });
}
