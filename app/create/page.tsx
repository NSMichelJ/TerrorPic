"use client";

import MyDropzone from "@/app/components/Dropzone";
import Link from "next/link";
import { Ghost } from "lucide-react";
import { getCldImageUrl } from "next-cloudinary";
import { useUIStore } from "@/app/storage";
import { backgroundPrompts, costumePrompts } from "@/app/lib/prompts";
import ScaryLoader from "@/components/ScaryLoader";

import TransfornSelector from "../components/TransfornSelector";
import PhotoSlider from "../components/PhotoSlider";
import { toast } from "sonner";
import { ShowResult } from "../components/ShowResult";

export default function CreatePage() {
  const publicID = useUIStore((state) => state.publicID);
  const setImageContent = useUIStore((state) => state.setImageContent);
  const imageContent = useUIStore((state) => state.imageContent);

  const selectedBackground = useUIStore((state) => state.selectedBackground);
  const selectedCostume = useUIStore((state) => state.selectedCostume);

  const appState = useUIStore((state) => state.appState);
  const setAppState = useUIStore((state) => state.setAppState);

  const handleGenerate = async () => {
    try {
      const url = getCldImageUrl({
        width: 900,
        height: 600,
        src: `${publicID}`,
        replaceBackground: backgroundPrompts[selectedBackground],
        replace: costumePrompts[selectedCostume]
          ? {
              from: "personal clothing",
              to: `${costumePrompts[selectedCostume]}`,
              preserveGeometry: true,
            }
          : undefined,
      });
      const response = await fetch(url);

      if (response.status == 423) {
        setTimeout(() => {
          handleGenerate();
        }, 5000);
        return;
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      setImageContent(blob);
      setAppState("resultReady");
    } catch (error) {
      toast.error("Oops, sorry! Error creating the image.");
      setAppState("idle");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen text-gray-200">
      <header className="flex justify-between items-center p-4 bg-gray-900 border-slate-800 border-b">
        <Link className="flex items-center text-3xl font-bold " href="/">
          <Ghost className="w-8 h-8 mr-2" />
          <span className="font-bold text-2xl">TerrorPic</span>
        </Link>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[18%] min-w-[280px] bg-gray-900 flex flex-col">
          <TransfornSelector onGenerate={handleGenerate} />
        </aside>

        <main className="w-[50%] max-h-full bg-gray-800  overflow-y-auto flex flex-col items-center p-4">
          <div className="py-16">
            <MyDropzone />
          </div>

          <div className="max-w-lg mx-auto p-5">
            <PhotoSlider />
          </div>
        </main>

        <aside className="w-[32%] p-6 overflow-y-auto bg-gray-900 border-gray-800 border-l">
          <div className="flex flex-col justify-center items-center gap-4 mb-4">
            <h3 className="text-lg text-center font-bold mb-4">Result</h3>

            {!imageContent && appState !== "transformingImage" && (
              <>
                <div className="animate-bounce">
                  <svg
                    className="w-16 h-16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2a9 9 0 0 0-9 9v11l3-3l3 3l3-3l3 3l3-3l3 3V11a9 9 0 0 0-9-9M9 8a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m6 0a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2"
                    ></path>
                  </svg>
                </div>

                <p>There are no transformations</p>
              </>
            )}
          </div>

          {appState === "transformingImage" && <ScaryLoader />}
          {imageContent && appState === "resultReady" && <ShowResult />}
        </aside>
      </div>
    </div>
  );
}
