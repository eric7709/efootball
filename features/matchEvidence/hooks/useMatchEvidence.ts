import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { matchEvidenceRepository } from "./api.matchEvidence";

export function useMatchEvidence(matchId:string) {
  return useQuery({
    queryKey: queryKeys.evidence.byMatch(matchId),
    queryFn: ()=>matchEvidenceRepository.listByMatch(matchId),
    enabled: Boolean(matchId),,
  });
}
