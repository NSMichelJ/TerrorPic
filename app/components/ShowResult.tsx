"use client";

import { Download, RotateCcw } from "lucide-react";
import { useUIStore } from "@/app/storage";
import InteractiveImage from "@/components/InteractiveImage";
import { savePhoto } from "@/lib";
import { toast } from "sonner";
import Image from "next/image";
import { useRef, useState } from "react";
import { ImageFilters } from "../types";
import { finetuneImage } from "../lib/finetuneImage";

export function ShowResult() {
  const publicID = useUIStore((state) => state.publicID);
  const imageContent = useUIStore((state) => state.imageContent);
  const imgRef = useRef<HTMLImageElement>(null);

  const [filters, setFilters] = useState<ImageFilters>({
    contrast: 100,
    brightness: 100,
    saturate: 100,
  });

  const handleFilterChange =
    (filter: keyof ImageFilters) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({ ...prev, [filter]: Number(e.target.value) }));
    };

  const filterStyle = {
    filter: `contrast(${filters.contrast}%) brightness(${filters.brightness}%) saturate(${filters.saturate}%)`,
  };

  return (
    <div>
      <InteractiveImage
        options={[
          {
            icon: <Download size={20} />,
            options: [
              {
                label: "PNG",
                onClick: async () => {
                  if (publicID) {
                    try {
                      const canvas = finetuneImage(imgRef.current, filters);

                      canvas?.toBlob((blob) => {
                        if (blob) {
                          savePhoto(blob, `terrorpic_${publicID}.png`);
                        }
                      });
                    } catch (error) {
                      toast.error("Oops, sorry! Error downloading the image.");
                      console.error("Error downloading the image:", error);
                    }
                  }
                },
              },
              {
                label: "JPG",
                onClick: async () => {
                  if (publicID) {
                    try {
                      const canvas = finetuneImage(imgRef.current, filters);

                      canvas?.toBlob((blob) => {
                        if (blob) {
                          savePhoto(blob, `terrorpic_${publicID}.jpg`);
                        }
                      });
                    } catch (error) {
                      toast.error("Oops, sorry! Error downloading the image.");
                      console.error("Error downloading the image:", error);
                    }
                  }
                },
              },
            ],
          },
        ]}
      >
        {imageContent && (
          <Image
            width={900}
            height={900}
            alt="User image"
            src={URL.createObjectURL(imageContent)}
            ref={imgRef}
            style={filterStyle}
          />
        )}
      </InteractiveImage>
      <div className="max-w-4xl bg-gray-800 mx-auto rounded-lg shadow-md p-6">
        <h3 className="text-3xl font-bold mb-6 text-center text-gray-200">
          Finetune
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {Object.entries(filters).map(([filter, value]) => (
            <div key={filter}>
              <label
                htmlFor={filter}
                className="block text-sm font-medium mb-2 capitalize"
              >
                {filter}: {value}%
              </label>
              <input
                type="range"
                id={filter}
                min="0"
                max="200"
                value={value}
                onChange={handleFilterChange(filter as keyof ImageFilters)}
                className="w-full"
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setFilters({
              contrast: 100,
              brightness: 100,
              saturate: 100,
            });
          }}
          className="mx-auto bg-medium-purple-700 hover:bg-medium-purple-800 px-4 py-2 rounded-md flex gap-1 items-center justify-center cursor-pointer"
        >
          <RotateCcw />
        </button>
      </div>
    </div>
  );
}
