import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import{notificationRepository}from"./api.notification";export function useMarkNotificationRead(){const c = useQueryClient();return useMutation({
    mutationFn:(id:string)=>notificationRepository.markRead(id),
    onSuccess:(n)=>{c.setQueryData(queryKeys.notifications.detail(n.id),n);c.invalidateQueries({queryKey:queryKeys.notifications.all})}});}
