import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { playerRepository } from "./api.player";

export function usePlayers() {
  return useQuery({
    queryKey: queryKeys.players.all,
    queryFn: playerRepository.list,
  });
}
