import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import { competitionRepository } from "../api/competition";

export function useCompetition(id: string) {
  return useQuery({
    queryKey: queryKeys.competitions.detail(id),
    queryFn: () => competitionRepository.getById(id),
    enabled: Boolean(id),
  });
}
