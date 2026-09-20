import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { teamRepository } from "./api.team";

export function useTeams() {
  return useQuery({
    queryKey: queryKeys.teams.all,
    queryFn: teamRepository.list,
  });
}
