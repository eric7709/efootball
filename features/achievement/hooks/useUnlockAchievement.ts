import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import{achievementRepository}from"./api.achievement";export function useUnlockAchievement(){const c = useQueryClient();return useMutation({
    mutationFn:achievementRepository.unlock,
    onSuccess:()=>c.invalidateQueries({queryKey:queryKeys.achievements.all})});}
