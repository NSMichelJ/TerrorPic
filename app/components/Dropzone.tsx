"use client";

import React, { useCallback } from "react";
import { CldImage } from "next-cloudinary";
import { useDropzone } from "react-dropzone";
import { ArrowLeftIcon, ImageUp } from "lucide-react";

import { uploadFile } from "@/lib";
import { useUIStore } from "@/storage";
import useLocalStorage from "../hooks/useLocalStorage";

interface UploadedImage {
  publidID: string;
}

export default function MyDropzone() {
  const [uploadedImages, setUploadedImages] = useLocalStorage<UploadedImage[]>(
    "terror_pic_uploade_images",
    []
  );
  const publicID = useUIStore((state) => state.publicID);
  const appState = useUIStore((state) => state.appState);

  const setPublicID = useUIStore((state) => state.setPublicID);
  const setAppState = useUIStore((state) => state.setAppState);
  const setImageContent = useUIStore((state) => state.setImageContent);
  const setSelectedBackground = useUIStore(
    (state) => state.setSelectedBackground
  );
  const setSelectedCostume = useUIStore((state) => state.setSelectedCostume);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        try {
          const result = await uploadFile(file);
          setPublicID(result.public_id);
          setAppState("loadedImage");

          const images = [
            ...uploadedImages,
            {
              publidID: result.public_id,
            },
          ];
          setUploadedImages(images);
        } catch (error) {
          console.log(error);
        }
      }
    },
    [setPublicID, setAppState, setUploadedImages, uploadedImages]
  );

  const handleSampleSelect = (
    publicID: string,
    bg: string,
    costume: string
  ) => {
    setPublicID(publicID);
    setSelectedBackground(bg);
    setSelectedCostume(costume);
    setAppState("loadedImage");
  };

  const handleReset = () => {
    setPublicID(null);
    setAppState("idle");
    setImageContent(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: appState === "uploadingImage",
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });

  return (
    <div className="bg-gray-800 border-gray-700 p-6 border rounded-lg max-w-md mx-auto">
      {publicID ? (
        <div>
          <CldImage
            width="500"
            height="500"
            src={publicID}
            sizes="100vw"
            alt="User photo"
            className="w-auto h-auto max-h-[70vh] mx-auto"
          />

          <div className="flex justify-center mt-4">
            <button
              onClick={handleReset}
              type="button"
              className="flex items-center gap-1 focus:outline-none bg-medium-purple-700 hover:bg-medium-purple-800 font-medium rounded-lg text-md px-5 py-2.5 mb-2"
            >
              <ArrowLeftIcon /> Choose Another Image
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center flex items-start justify-center transition-colors hover:border-medium-purple-700 ${
              isDragActive ? "border-medium-purple-700" : "border-gray-400"
            }`}
          >
            <input {...getInputProps()} />
            <div>
              <div className="inline-block text-gray-200 bg-medium-purple-700 font-medium rounded-lg text-md px-5 py-2.5 mb-2">
                <ImageUp size={34} />
              </div>
              <p className="text-md font-medium tracking-tight text-gray-200">
                {isDragActive ? (
                  <span>Drop the photo here...</span>
                ) : (
                  <span>
                    Drag and drop a photo here, or click to select photo
                  </span>
                )}
              </p>
            </div>
          </div>

          {!publicID && (
            <div className="mt-6">
              <p className="font-normal text-center text-gray-300 mb-2">
                No image? Try one of these
              </p>
              <div className="flex justify-center flex-wrap gap-4">
                <CldImage
                  priority
                  src="rsqdhi2fyzknbm0b25q5"
                  alt="sample-1"
                  width={80}
                  height={80}
                  className="block h-auto w-auto rounded-lg object-cover cursor-pointer hover:ring-2 hover:ring-medium-purple-600"
                  onClick={() =>
                    handleSampleSelect(
                      "rsqdhi2fyzknbm0b25q5",
                      "cemetery",
                      "grimReaper"
                    )
                  }
                />
                <CldImage
                  priority
                  src="fw8x8byu84lfgunpp0xb"
                  alt="sample-1"
                  width={80}
                  height={80}
                  className="block h-auto w-auto rounded-lg object-cover cursor-pointer hover:ring-2 hover:ring-medium-purple-600"
                  onClick={() =>
                    handleSampleSelect(
                      "fw8x8byu84lfgunpp0xb",
                      "darkForest",
                      "zombie"
                    )
                  }
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
