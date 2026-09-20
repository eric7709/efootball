import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

import { notificationRepository } from "./api.notification";

export function useNotifications(userId?:string) {
  return useQuery({
    queryKey: queryKeys.notifications.all,
    queryFn: ()=>notificationRepository.list(userId),
  });
}
