import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { reportRepository } from "./api.report";

export function useReport(id:string) {
  return useQuery({
    queryKey: queryKeys.reports.detail(id),
    queryFn: ()=>reportRepository.getById(id),
    enabled: Boolean(id),
  });
}
