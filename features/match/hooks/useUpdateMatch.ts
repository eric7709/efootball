import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import{matchRepository}from"./api.match";

import type{UpdateMatchInput}from"../types.match";export function useUpdateMatch(){const c = useQueryClient();return useMutation({
    mutationFn:({id,input}:{id:string;input:UpdateMatchInput})=>matchRepository.update(id,input),
    onSuccess:(m)=>{c.setQueryData(queryKeys.matches.detail(m.id),m);c.invalidateQueries({queryKey:queryKeys.matches.all});c.invalidateQueries({queryKey:queryKeys.competitions.matches(m.competitionId)});}});}
