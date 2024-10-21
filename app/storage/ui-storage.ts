import { create } from "zustand";

interface State {
  appState:
    | "idle"
    | "uploadingImage"
    | "loadedImage"
    | "transformingImage"
    | "resultReady"
    | "error";
  publicID: string | null;
  imageContent: Blob | null;
  selectedBackground: string;
  selectedCostume: string;
}

interface Actions {
  setAppState: (state: State["appState"]) => void;
  setPublicID: (state: State["publicID"]) => void;
  setImageContent: (state: State["imageContent"]) => void;
  setSelectedBackground: (state: State["selectedBackground"]) => void;
  setSelectedCostume: (state: State["selectedCostume"]) => void;
}

export const useUIStore = create<State & Actions>()((set) => ({
  appState: "idle",
  publicID: null,
  srcImage: null,
  imageContent: null,
  selectedBackground: "original",
  selectedCostume: "original",

  setAppState: (appState) => set(() => ({ appState })),
  setPublicID: (publicID) => set(() => ({ publicID })),
  setImageContent: (imageContent) => set(() => ({ imageContent })),
  setSelectedBackground: (selectedBackground) =>
    set(() => ({ selectedBackground })),
  setSelectedCostume: (selectedCostume) => set(() => ({ selectedCostume })),
}));
