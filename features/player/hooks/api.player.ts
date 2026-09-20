import { api } from "@/lib/api/axios";

import type {
  CreatePlayerInput,
  Player,
  UpdatePlayerInput,
} from "../types.player";

export const playerRepository = {
  async list(): Promise<Player[]> {
    const response = await api.get<Player[]>("/players");
    return response.data;
  },
  async getById(id: string): Promise<Player> {
    const response = await api.get<Player>(`/players/${id}`);
    return response.data;
  },
  async create(input: CreatePlayerInput): Promise<Player> {
    const response = await api.post<Player>("/players", input);
    return response.data;
  },
  async update(id: string, input: UpdatePlayerInput): Promise<Player> {
    const response = await api.patch<Player>(`/players/${id}`, input);
    return response.data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/players/${id}`);
  },
};
