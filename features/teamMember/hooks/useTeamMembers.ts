import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { teamMemberRepository } from "./api.teamMember";

export function useTeamMembers(teamId?:string) {
  return useQuery({
    queryKey: teamId?queryKeys.teamMembers.byTeam(teamId):queryKeys.teamMembers.all,
    queryFn: ()=>teamId?teamMemberRepository.listByTeam(teamId):teamMemberRepository.list(),
  });
}
