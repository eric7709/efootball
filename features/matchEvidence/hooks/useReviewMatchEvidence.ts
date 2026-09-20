import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import{matchEvidenceRepository}from"./api.matchEvidence";

import type{ReviewMatchEvidenceInput}from"../types.match-evidence";export function useReviewMatchEvidence(){const c = useQueryClient();return useMutation({
    mutationFn:({id,input}:{id:string;input:ReviewMatchEvidenceInput})=>matchEvidenceRepository.review(id,input),
    onSuccess:(e)=>c.invalidateQueries({queryKey:queryKeys.evidence.byMatch(e.matchId)})});}
