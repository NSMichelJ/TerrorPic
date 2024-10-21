export async function savePhoto(
  imageContent: Blob | undefined,
  filename: string
) {
  try {
    if (imageContent) {
      const url = window.URL.createObjectURL(imageContent);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(url);
    }
  } catch (error) {
    throw error;
  }
}
