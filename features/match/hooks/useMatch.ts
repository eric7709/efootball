import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { matchRepository } from "./api.match";

export function useMatch(id:string) {
  return useQuery({
    queryKey: queryKeys.matches.detail(id),
    queryFn: ()=>matchRepository.getById(id),
    enabled: Boolean(id),
  });
}
