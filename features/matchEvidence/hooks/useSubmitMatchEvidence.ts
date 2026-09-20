import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import{matchEvidenceRepository}from"./api.matchEvidence";

import type{SubmitMatchEvidenceInput}from"../types.match-evidence";export function useSubmitMatchEvidence(){const c = useQueryClient();return useMutation({
    mutationFn:(i:SubmitMatchEvidenceInput)=>matchEvidenceRepository.submit(i),
    onSuccess:(e)=>c.invalidateQueries({queryKey:queryKeys.evidence.byMatch(e.matchId)})});}
