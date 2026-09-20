import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import {competitionTeamRepository} from "./api.competitionTeam";

import type {UpdateCompetitionTeamInput} from "../types.competition-team";
export function useUpdateCompetitionTeam(){const c = useQueryClient();return useMutation({
    mutationFn:({id,input}:{id:string;input:UpdateCompetitionTeamInput})=>competitionTeamRepository.update(id,input),
    onSuccess:(r)=>{c.invalidateQueries({queryKey:queryKeys.competitionTeams.byCompetition(r.competitionId)});}});}
