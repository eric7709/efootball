import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import {teamMemberRepository} from "./api.teamMember";

import type {UpdateTeamMemberInput} from "../types.team-member";
export function useUpdateTeamMember(){const c = useQueryClient();return useMutation({
    mutationFn:({id,input}:{id:string;input:UpdateTeamMemberInput})=>teamMemberRepository.update(id,input),
    onSuccess:(m)=>{c.invalidateQueries({queryKey:queryKeys.teamMembers.byTeam(m.teamId)});c.invalidateQueries({queryKey:queryKeys.teamMembers.byPlayer(m.playerId)});}});}
