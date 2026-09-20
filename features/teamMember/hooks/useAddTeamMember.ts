import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import {teamMemberRepository} from "./api.teamMember";

import type {AddTeamMemberInput} from "../types.team-member";
export function useAddTeamMember(){const c = useQueryClient();return useMutation({
    mutationFn:(input:AddTeamMemberInput)=>teamMemberRepository.add(input),
    onSuccess:(m)=>{c.invalidateQueries({queryKey:queryKeys.teamMembers.byTeam(m.teamId)});c.invalidateQueries({queryKey:queryKeys.teamMembers.byPlayer(m.playerId)});}});}
