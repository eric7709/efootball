import { api } from "@/lib/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/api/query-keys";

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

export function usePlayer(id: string) {
  return useQuery({
    queryKey: queryKeys.players.detail(id),
    queryFn: () => playerRepository.getById(id),
    enabled: Boolean(id),
  });
}

export function usePlayers() {
  return useQuery({
    queryKey: queryKeys.players.all,
    queryFn: playerRepository.list,
  });
}

export function useCreatePlayer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePlayerInput) => playerRepository.create(input),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.players.all }),
  });
}

export function useDeletePlayer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => playerRepository.delete(id),
    onSuccess: (_result, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.players.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.players.all });
    },
  });
}

export function useUpdatePlayer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdatePlayerInput }) =>
      playerRepository.update(id, input),
    onSuccess: (player) => {
      queryClient.setQueryData(queryKeys.players.detail(player.id), player);
      queryClient.invalidateQueries({ queryKey: queryKeys.players.all });
    },
  });
}

export const useGetAllPlayers = usePlayers;
export const useGetPlayer = usePlayer;
