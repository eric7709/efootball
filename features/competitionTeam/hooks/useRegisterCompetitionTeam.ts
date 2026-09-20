import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import {competitionTeamRepository} from "./api.competitionTeam";

import type {RegisterCompetitionTeamInput} from "../types.competition-team";
export function useRegisterCompetitionTeam(){const c = useQueryClient();return useMutation({
    mutationFn:(input:RegisterCompetitionTeamInput)=>competitionTeamRepository.register(input),
    onSuccess:(r)=>{c.invalidateQueries({queryKey:queryKeys.competitionTeams.byCompetition(r.competitionId)});c.invalidateQueries({queryKey:queryKeys.competitionTeams.byTeam(r.teamId)});}});}
