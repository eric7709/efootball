import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import {competitionTeamRepository} from "./api.competitionTeam";

import type {CompetitionTeam} from "../types.competition-team";
export function useWithdrawCompetitionTeam(){const c = useQueryClient();return useMutation({
    mutationFn:(r:CompetitionTeam)=>competitionTeamRepository.withdraw(r.id),
    onSuccess:(x)=>{c.invalidateQueries({queryKey:queryKeys.competitionTeams.byCompetition(x.competitionId)});c.invalidateQueries({queryKey:queryKeys.competitionTeams.byTeam(x.teamId)});}});}
