import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { achievementRepository } from "./api.achievement";

export function useAchievements(playerId?:string) {
  return useQuery({
    queryKey: queryKeys.achievements.all,
    queryFn: ()=>achievementRepository.list(playerId),
  });
}
