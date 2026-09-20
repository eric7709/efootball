import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { rankingRepository } from "./api.ranking";

export function useRanking(id:string) {
  return useQuery({
    queryKey: queryKeys.rankings.detail(id),
    queryFn: ()=>rankingRepository.getById(id),
    enabled: Boolean(id),
  });
}
