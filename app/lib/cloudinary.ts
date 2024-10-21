export async function uploadFile(file: File | null) {
  if (!file) return;

  const timestamp = Date.now();

  const formData = new FormData();

  // const parameters: { [key: string]: string | Blob } = {
  //   upload_preset: "TerrorPic",
  // };

  // if (typeof process.env.NEXT_PUBLIC_CLOUDINARY_UPLOADS_FOLDER === "string") {
  //   parameters.folder = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOADS_FOLDER;
  // }

  // Object.keys(parameters)
  //   .sort()
  //   .forEach((key) => {
  //     if (typeof parameters[key] === "undefined") return;
  //     formData.append(key, String(parameters[key]));
  //   });

  // const { signature } = await fetch("/api/sign", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     ...parameters,
  //     timestamp,
  //   }),
  // }).then((r) => r.json());

  formData.append("file", file);
  formData.append(
    "api_key",
    String(process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
  );
  formData.append("upload_preset", "TerrorPic");
  formData.append("timestamp", String(timestamp));
  // formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error.message || "Uknown error");
  }

  const results = await response.json();

  const moderation = results.moderation?.find(
    ({ kind }: { kind: string }) => kind === "aws_rek"
  );

  if (moderation?.status === "rejected") {
    throw new Error("INAPPROPRIATE_CONTENT");
  }

  return results;
}
