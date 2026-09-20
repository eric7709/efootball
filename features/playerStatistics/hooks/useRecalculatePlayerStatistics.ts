import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import{playerStatisticsRepository}from"./api.playerStatistics";export function useRecalculatePlayerStatistics(){const c = useQueryClient();return useMutation({
    mutationFn:(playerId:string)=>playerStatisticsRepository.recalculate(playerId),
    onSuccess:(s)=>c.setQueryData(queryKeys.playerStatistics.detail(s.playerId),s)});}
