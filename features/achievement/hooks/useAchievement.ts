import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { achievementRepository } from "./api.achievement";

export function useAchievement(id:string) {
  return useQuery({
    queryKey: queryKeys.achievements.detail(id),
    queryFn: ()=>achievementRepository.getById(id),
    enabled: Boolean(id),
  });
}
