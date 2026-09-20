import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { teamRepository } from "./api.team"; export function useDeleteTeam(){const c = useQueryClient();return useMutation({
    mutationFn:(id:string)=>teamRepository.delete(id),
    onSuccess:({id})=>{c.removeQueries({queryKey:queryKeys.teams.detail(id)});c.invalidateQueries({queryKey:queryKeys.teams.all})}});}
