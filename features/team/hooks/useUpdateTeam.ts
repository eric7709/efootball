import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { teamRepository } from "./api.team";

import type {UpdateTeamInput} from "../types.team"; export function useUpdateTeam(){const c = useQueryClient();return useMutation({
    mutationFn:({id,input}:{id:string;input:UpdateTeamInput})=>teamRepository.update(id,input),
    onSuccess:(team)=>{c.setQueryData(queryKeys.teams.detail(team.id),team);c.invalidateQueries({queryKey:queryKeys.teams.all})}});}
