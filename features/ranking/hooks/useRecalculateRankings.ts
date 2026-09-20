import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import{rankingRepository}from"./api.ranking";export function useRecalculateRankings(){const c = useQueryClient();return useMutation({
    mutationFn:rankingRepository.recalculate,
    onSuccess:(data)=>c.setQueryData(queryKeys.rankings.all,data)});}
