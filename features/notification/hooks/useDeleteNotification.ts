import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import{notificationRepository}from"./api.notification";export function useDeleteNotification(){const c = useQueryClient();return useMutation({
    mutationFn:(id:string)=>notificationRepository.delete(id),
    onSuccess:({id})=>{c.removeQueries({queryKey:queryKeys.notifications.detail(id)});c.invalidateQueries({queryKey:queryKeys.notifications.all})}});}
