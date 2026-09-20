import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { reportRepository } from "./api.report";

export function useReports() {
  return useQuery({
    queryKey: queryKeys.reports.all,
    queryFn: reportRepository.list,
  });
}
