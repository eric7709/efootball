import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { teamRepository } from "./api.team";

export function useTeam(id:string) {
  return useQuery({
    queryKey: queryKeys.teams.detail(id),
    queryFn: ()=>teamRepository.getById(id),
    enabled: Boolean(id),
  });
}
