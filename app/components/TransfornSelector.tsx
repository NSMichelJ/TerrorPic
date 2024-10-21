"use client";

import React from "react";
import ItemSelector from "./ItemSelector";
import { Item } from "../types";
import { useUIStore } from "../storage";
import { ArrowRight } from "lucide-react";

const backgrounds: Item[] = [
  {
    name: "Original",
    image: "/img/background/original.jpg",
    key: "original",
  },
  {
    name: "Cemetery",
    image: "/img/background/sample-1.jpg",
    key: "cemetery",
  },
  {
    name: "Abandoned Mansion",
    image: "/img/background/sample-2.jpg",
    key: "abandonedMansion",
  },
  {
    name: "Halloween Scene",
    image: "/img/background/sample-3.jpg",
    key: "halloweenScene",
  },
  {
    name: "Dark Forest",
    image: "/img/background/sample-4.jpg",
    key: "darkForest",
  },
  {
    name: "Dark Lab",
    image: "/img/background/sample-5.jpg",
    key: "darkLab",
  },
  {
    name: "Dark Cave",
    image: "/img/background/sample-6.jpg",
    key: "darkCave",
  },
  {
    name: "Ghosts and Spirits",
    image: "/img/background/sample-7.jpg",
    key: "ghostsAndSpirits",
  },
  {
    name: "Haunted House",
    image: "/img/background/sample-8.jpg",
    key: "hauntedHouse",
  },
  {
    name: "Zombie Apocalypse",
    image: "/img/background/sample-9.jpg",
    key: "zombieApocalypse",
  },
  {
    name: "Creepy Catacombs",
    image: "/img/background/sample-10.jpg",
    key: "creepyCatacombs",
  },
];

const costumes: Item[] = [
  { name: "Original", image: "/img/costume/original.jpg", key: "original" },
  { name: "Zombie", image: "/img/costume/sample-1.jpg", key: "zombie" },
  { name: "Vampire", image: "/img/costume/sample-2.jpg", key: "vampire" },
  { name: "Witch", image: "/img/costume/sample-3.jpg", key: "witch" },
  { name: "Ghost", image: "/img/costume/sample-4.jpg", key: "ghost" },
  { name: "Mummy", image: "/img/costume/sample-5.jpg", key: "mummy" },
  { name: "Skeleton", image: "/img/costume/sample-6.jpg", key: "skeleton" },
  {
    name: "Grim Reaper",
    image: "/img/costume/sample-7.jpg",
    key: "grimReaper",
  },
  {
    name: "Evil Clown",
    image: "/img/costume/sample-8.jpg",
    key: "evilClown",
  },
  {
    name: "Ripper",
    image: "/img/costume/sample-9.jpg",
    key: "ripper",
  },
];

function TransfornSelector({ onGenerate }: { onGenerate: () => void }) {
  const publicID = useUIStore((state) => state.publicID);
  const selectedBackground = useUIStore((state) => state.selectedBackground);
  const selectedCostume = useUIStore((state) => state.selectedCostume);
  const setSelectedBackground = useUIStore(
    (state) => state.setSelectedBackground
  );
  const setSelectedCostume = useUIStore((state) => state.setSelectedCostume);
  const appState = useUIStore((state) => state.appState);
  const setAppState = useUIStore((state) => state.setAppState);

  const handleGenerate = async () => {
    if (appState === "transformingImage") return;
    if (!publicID) return;
    setAppState("transformingImage");
    onGenerate();
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4">
        <ItemSelector
          title="Backgrund"
          items={backgrounds}
          selectedItem={selectedBackground}
          setSelectedItem={setSelectedBackground}
        />

        <ItemSelector
          title="Costume"
          items={costumes}
          selectedItem={selectedCostume}
          setSelectedItem={setSelectedCostume}
          className="mt-6"
        />
      </div>
      <div className="p-4">
        <button
          className={`w-full bg-medium-purple-700 hover:bg-medium-purple-800 px-4 py-2 rounded-md flex gap-1 items-center justify-center ${
            appState === "transformingImage" || !publicID
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
          onClick={handleGenerate}
          disabled={appState === "transformingImage" || !publicID}
        >
          Generate{" "}
          {appState === "transformingImage" ? (
            <div className="size-4 mx-2 border-t-4 border-gray-200 border-solid rounded-full animate-spin"></div>
          ) : (
            <ArrowRight />
          )}
        </button>
      </div>
    </>
  );
}

export default TransfornSelector;
