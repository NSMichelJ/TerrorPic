"use client";

import React from "react";
import { CldImage } from "next-cloudinary";

import { useUIStore } from "@/storage";
import { Trash2 } from "lucide-react";

function PhotoSlider() {
  const setPublicID = useUIStore((state) => state.setPublicID);
  const uploadedPhotos = useUIStore((state) => state.uploadedPhotos);
  const removeUploadedPhotos = useUIStore(
    (state) => state.removeUploadedPhotos
  );

  return (
    <>
      {uploadedPhotos.length > 0 && (
        <div>
          <h3 className="text-center text-md font-bold mb-2">
            My uploaded photos
          </h3>
          <div className="-m-2 flex flex-wrap">
            {uploadedPhotos.map((uploadedImage, i) => (
              <div
                className="flex w-1/3 flex-wrap cursor-pointer"
                key={i}
                onClick={() => setPublicID(uploadedImage)}
              >
                <div className="w-full p-1 md:p-2">
                  <CldImage
                    width={200}
                    height={200}
                    key={i}
                    src={uploadedImage}
                    alt={`Image: ${uploadedImage}`}
                    className="block h-full w-full rounded-lg object-cover object-center"
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <button
              onClick={removeUploadedPhotos}
              className="mx-auto m-4 bg-medium-purple-700 hover:bg-medium-purple-800 px-4 py-2 rounded-md flex gap-1 items-center justify-center cursor-pointer"
            >
              <Trash2 />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PhotoSlider;
