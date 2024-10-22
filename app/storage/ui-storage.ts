import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  uploadedPhotos: string[];
}

interface Actions {
  setAppState: (state: State["appState"]) => void;
  setPublicID: (state: State["publicID"]) => void;
  setImageContent: (state: State["imageContent"]) => void;
  setSelectedBackground: (state: State["selectedBackground"]) => void;
  setSelectedCostume: (state: State["selectedCostume"]) => void;
  addUploadedPhoto: (photoUrl: string) => void;
  removeUploadedPhotos: () => void;
}

export const useUIStore = create<State & Actions>()(
  persist(
    (set) => ({
      appState: "idle",
      publicID: null,
      srcImage: null,
      imageContent: null,
      selectedBackground: "original",
      selectedCostume: "original",
      uploadedPhotos: [],

      setAppState: (appState) => set(() => ({ appState })),
      setPublicID: (publicID) => set(() => ({ publicID })),
      setImageContent: (imageContent) => set(() => ({ imageContent })),
      setSelectedBackground: (selectedBackground) =>
        set(() => ({ selectedBackground })),
      setSelectedCostume: (selectedCostume) => set(() => ({ selectedCostume })),
      addUploadedPhoto: (photoUrl) =>
        set((state) => ({
          uploadedPhotos: [...state.uploadedPhotos, photoUrl],
        })),
      removeUploadedPhotos: () =>
        set(() => ({
          uploadedPhotos: [],
        })),
    }),
    {
      name: "terror_pic",
      partialize: (state) => ({
        uploadedPhotos: state.uploadedPhotos,
      }),
    }
  )
);
