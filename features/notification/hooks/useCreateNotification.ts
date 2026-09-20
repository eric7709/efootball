import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";
import{notificationRepository}from"./api.notification";

import type{CreateNotificationInput}from"../types.notification";export function useCreateNotification(){const c = useQueryClient();return useMutation({
    mutationFn:(i:CreateNotificationInput)=>notificationRepository.create(i),
    onSuccess:()=>c.invalidateQueries({queryKey:queryKeys.notifications.all})});}
