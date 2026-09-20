import { create } from "zustand";

interface State { isPanelOpen: boolean; setPanelOpen: (value: boolean) => void; }

export const useNotificationStore = create<State>((set) => ({
  isPanelOpen: false,
  setPanelOpen: (value) => set({ isPanelOpen: value }),
}));
