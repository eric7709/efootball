import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { playerStatisticsRepository } from "./api.playerStatistics";

export function usePlayerStatistics(playerId:string) {
  return useQuery({
    queryKey: queryKeys.playerStatistics.detail(playerId),
    queryFn: ()=>playerStatisticsRepository.getByPlayer(playerId),
    enabled: Boolean(playerId),,
  });
}
