import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import {teamMemberRepository} from "./api.teamMember";

import type {TeamMember} from "../types.team-member";
export function useRemoveTeamMember(){const c = useQueryClient();return useMutation({
    mutationFn:(member:TeamMember)=>teamMemberRepository.remove(member.id),
    onSuccess:(_,member)=>{c.invalidateQueries({queryKey:queryKeys.teamMembers.byTeam(member.teamId)});c.invalidateQueries({queryKey:queryKeys.teamMembers.byPlayer(member.playerId)});}});}
