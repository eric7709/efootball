import { api } from "@/lib/api/axios";

import type {
  Notification,
} from "../types.notification";

export const notificationRepository = {
  async list(userId?: string): Promise<Notification[]> {
    const response = await api.get<Notification[]>("/notifications", { params: { userId } });
    return response.data;
  },
  async getById(id: string): Promise<Notification> {
    const response = await api.get<Notification>(`/notifications/${id}`);
    return response.data;
  },
  async create(input: CreateNotificationInput): Promise<Notification> {
    const response = await api.post<Notification>("/notifications", input);
    return response.data;
  },
  async markRead(id: string): Promise<Notification> {
    const response = await api.patch<Notification>(`/notifications/${id}/read`);
    return response.data;
  },
  async markAllRead(userId: string): Promise<void> {
    await api.patch(`/notifications/read-all`, { userId });
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/notifications/${id}`);
  },
};
