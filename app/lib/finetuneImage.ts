import { ImageFilters } from "../types";

export function finetuneImage(
  imageElement: HTMLImageElement | null,
  filters: ImageFilters
) {
  if (!imageElement) return null;

  const image = imageElement;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  ctx.filter = `contrast(${filters.contrast}%) brightness(${filters.brightness}%) saturate(${filters.saturate}%)`;
  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

  return canvas;
}
