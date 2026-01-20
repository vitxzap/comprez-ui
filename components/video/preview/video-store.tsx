import { create } from "zustand";

type State = {
  isReady: boolean;
};

type Action = {
  update: (isReady: State["isReady"]) => void;
};
// This provide isReady global state to be used at the options' component submit button  
export const useVideoStore = create<State & Action>((set) => ({
  isReady: false,
  update: (isReady) => set(() => ({ isReady: isReady })),
}));
