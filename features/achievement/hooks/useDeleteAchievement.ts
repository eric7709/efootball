import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import{achievementRepository}from"./api.achievement";export function useDeleteAchievement(){const c = useQueryClient();return useMutation({
    mutationFn:(id:string)=>achievementRepository.delete(id),
    onSuccess:({id})=>{c.removeQueries({queryKey:queryKeys.achievements.detail(id)});c.invalidateQueries({queryKey:queryKeys.achievements.all})}});}
