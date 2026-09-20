import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { teamMemberRepository } from "./api.teamMember";

export function usePlayerTeams(playerId:string) {
  return useQuery({
    queryKey: queryKeys.teamMembers.byPlayer(playerId),
    queryFn: ()=>teamMemberRepository.listByPlayer(playerId),
    enabled: Boolean(playerId),,
  });
}
