import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import{notificationRepository}from"./api.notification";export function useMarkAllNotificationsRead(){const c = useQueryClient();return useMutation({
    mutationFn:(userId:string)=>notificationRepository.markAllRead(userId),
    onSuccess:()=>c.invalidateQueries({queryKey:queryKeys.notifications.all})});}
