import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { rankingRepository } from "./api.ranking";

export function useRankings(category?:Ranking["category"]) {
  return useQuery({
    queryKey: queryKeys.rankings.all,
    queryFn: ()=>rankingRepository.list(category),
  });
}
