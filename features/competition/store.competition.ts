import { create } from "zustand";

import type { Competition } from "./types.competition";

export type CompetitionModalType = "update" | "delete" | null;

interface State {
  isPanelOpen: boolean;
  modalType: CompetitionModalType;
  selectedCompetition: Competition | null;
  setPanelOpen: (value: boolean) => void;
  openUpdateModal: (competition: Competition) => void;
  openDeleteModal: (competition: Competition) => void;
  closeModal: () => void;
}

export const useCompetitionStore = create<State>((set) => ({
  isPanelOpen: false,
  modalType: null,
  selectedCompetition: null,
  setPanelOpen: (value) => set({ isPanelOpen: value }),
  openUpdateModal: (competition) =>
    set({ modalType: "update", selectedCompetition: competition }),
  openDeleteModal: (competition) =>
    set({ modalType: "delete", selectedCompetition: competition }),
  closeModal: () => set({ modalType: null, selectedCompetition: null }),
}));
