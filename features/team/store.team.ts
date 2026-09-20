import { create } from "zustand";

import type { Team } from "./types.team";

export type TeamModalType = "create" | "update" | "delete" | null;

interface State {
  isPanelOpen: boolean;
  modalType: TeamModalType;
  selectedTeam: Team | null;
  setPanelOpen: (value: boolean) => void;
  openCreateModal: () => void;
  openUpdateModal: (team: Team) => void;
  openDeleteModal: (team: Team) => void;
  closeModal: () => void;
}

export const useTeamStore = create<State>((set) => ({
  isPanelOpen: false,
  modalType: null,
  selectedTeam: null,
  setPanelOpen: (value) => set({ isPanelOpen: value }),
  openCreateModal: () => set({ modalType: "create", selectedTeam: null }),
  openUpdateModal: (team) => set({ modalType: "update", selectedTeam: team }),
  openDeleteModal: (team) => set({ modalType: "delete", selectedTeam: team }),
  closeModal: () => set({ modalType: null, selectedTeam: null }),
}));
