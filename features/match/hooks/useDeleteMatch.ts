import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import{matchRepository}from"./api.match";export function useDeleteMatch(){const c = useQueryClient();return useMutation({
    mutationFn:(m:{id:string;competitionId:string})=>matchRepository.delete(m.id),
    onSuccess:(_,m)=>{c.removeQueries({queryKey:queryKeys.matches.detail(m.id)});c.invalidateQueries({queryKey:queryKeys.matches.all});c.invalidateQueries({queryKey:queryKeys.competitions.matches(m.competitionId)});}});}
