"use client";

import React from "react";
import { CldImage } from "next-cloudinary";

import { useUIStore } from "@/storage";
import useLocalStorage from "../hooks/useLocalStorage";
import { Trash2 } from "lucide-react";

interface UploadedImage {
  publidID: string;
}

function PhotoSlider() {
  const [uploadedImages, setUploadedImages] = useLocalStorage<UploadedImage[]>(
    "terror_pic_uploade_images",
    []
  );
  const setPublicID = useUIStore((state) => state.setPublicID);

  return (
    <>
      {uploadedImages.length > 0 && (
        <div>
          <h3 className="text-center text-md font-bold mb-2">
            My uploaded photos
          </h3>
          <div className="-m-2 flex flex-wrap">
            {uploadedImages.map((uploadedImage: UploadedImage, i) => (
              <div
                className="flex w-1/3 flex-wrap cursor-pointer"
                key={i}
                onClick={() => setPublicID(uploadedImage.publidID)}
              >
                <div className="w-full p-1 md:p-2">
                  <CldImage
                    width={200}
                    height={200}
                    key={i}
                    src={uploadedImage.publidID}
                    alt={`Image: ${uploadedImage.publidID}`}
                    className="block h-full w-full rounded-lg object-cover object-center"
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <button
              onClick={() => setUploadedImages([])}
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
