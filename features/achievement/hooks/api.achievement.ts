import { api } from "@/lib/api/axios";

import type {
  Achievement,
} from "../types.achievement";

export const achievementRepository = {
  async list(playerId?: string): Promise<Achievement[]> {
    const response = await api.get<Achievement[]>("/achievements", { params: { playerId } });
    return response.data;
  },
  async getById(id: string): Promise<Achievement> {
    const response = await api.get<Achievement>(`/achievements/${id}`);
    return response.data;
  },
  async unlock(input: { playerId: string; name: string; description: string; icon?: string }): Promise<Achievement> {
    const response = await api.post<Achievement>("/achievements/unlock", input);
    return response.data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/achievements/${id}`);
  },
};
