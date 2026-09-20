import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import{matchRepository}from"./api.match";

import type{CreateMatchInput}from"../types.match";export function useCreateMatch(){const c = useQueryClient();return useMutation({
    mutationFn:(input:CreateMatchInput)=>matchRepository.create(input),
    onSuccess:(m)=>{c.invalidateQueries({queryKey:queryKeys.matches.all});c.invalidateQueries({queryKey:queryKeys.competitions.matches(m.competitionId)});}});}
