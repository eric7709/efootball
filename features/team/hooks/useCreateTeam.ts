import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { teamRepository } from "./api.team";

import type {CreateTeamInput} from "../types.team"; export function useCreateTeam(){const c = useQueryClient();return useMutation({
    mutationFn:(input:CreateTeamInput)=>teamRepository.create(input),
    onSuccess:()=>c.invalidateQueries({queryKey:queryKeys.teams.all})});}
