import { create } from "zustand";

import type { Match } from "./types.match";

export type MatchModalType = "create" | "update" | "delete" | null;

interface State {
  isPanelOpen: boolean;
  modalType: MatchModalType;
  selectedMatch: Match | null;
  setPanelOpen: (value: boolean) => void;
  openCreateModal: () => void;
  openUpdateModal: (match: Match) => void;
  openDeleteModal: (match: Match) => void;
  closeModal: () => void;
}

export const useMatchStore = create<State>((set) => ({
  isPanelOpen: false,
  modalType: null,
  selectedMatch: null,
  setPanelOpen: (value) => set({ isPanelOpen: value }),
  openCreateModal: () => set({ modalType: "create", selectedMatch: null }),
  openUpdateModal: (match) =>
    set({ modalType: "update", selectedMatch: match }),
  openDeleteModal: (match) =>
    set({ modalType: "delete", selectedMatch: match }),
  closeModal: () => set({ modalType: null, selectedMatch: null }),
}));
