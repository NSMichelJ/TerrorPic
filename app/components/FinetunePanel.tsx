import React, { useState, useRef, useCallback, useEffect } from "react";
import { Sliders, Image as ImageIcon, Download } from "lucide-react";
import "react-image-crop/dist/ReactCrop.css";
import { useUIStore } from "../storage";

interface ImageFilters {
  contrast: number;
  brightness: number;
  saturate: number;
}

function FinetunePanel({ imgRef }) {
  const imageContent = useUIStore((state) => state.imageContent);
  const setImageContent = useUIStore((state) => state.setImageContent);

  const [imageUrl, setImageUrl] = useState("");
  const [filters, setFilters] = useState<ImageFilters>({
    contrast: 100,
    brightness: 100,
    saturate: 100,
  });

  useEffect(() => {
    if (imageContent) {
      setImageUrl(URL.createObjectURL(imageContent));
    }
  }, [imageContent]);
  const handleFilterChange =
    (filter: keyof ImageFilters) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prev) => ({ ...prev, [filter]: Number(e.target.value) }));
    };

  const filterStyle = {
    filter: `contrast(${filters.contrast}%) brightness(${filters.brightness}%) saturate(${filters.saturate}%)`,
  };

  const handleDownload = useCallback(() => {
    if (!imgRef.current) return;

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    ctx.filter = `contrast(${filters.contrast}%) brightness(${filters.brightness}%) saturate(${filters.saturate}%)`;
    ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

    canvas.toBlob((blob) => {
      if (!blob) {
        console.error("Canvas is empty");
        return;
      }
      setImageContent(blob);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "imagen_editada.png";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }, [filters, setImageContent]);

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Finetune
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {Object.entries(filters).map(([filter, value]) => (
          <div key={filter}>
            <label
              htmlFor={filter}
              className="block text-sm font-medium text-gray-700 mb-2 capitalize"
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

      {imageUrl && (
        <div className="flex justify-center">
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 flex items-center"
          >
            <Download className="mr-2" size={20} />
            Descargar imagen editada
          </button>
        </div>
      )}
    </div>
  );
}

export default FinetunePanel;
