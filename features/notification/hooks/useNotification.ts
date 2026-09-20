import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { notificationRepository } from "./api.notification";

export function useNotification(id:string) {
  return useQuery({
    queryKey: queryKeys.notifications.detail(id),
    queryFn: ()=>notificationRepository.getById(id),
    enabled: Boolean(id),
  });
}
