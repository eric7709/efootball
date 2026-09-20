import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import{matchEvidenceRepository}from"./api.matchEvidence";export function useDeleteMatchEvidence(){const c = useQueryClient();return useMutation({
    mutationFn:(e:{id:string;matchId:string})=>matchEvidenceRepository.delete(e.id),
    onSuccess:(_,e)=>c.invalidateQueries({queryKey:queryKeys.evidence.byMatch(e.matchId)})});}
