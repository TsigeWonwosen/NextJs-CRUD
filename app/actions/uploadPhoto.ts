"use server";
import cloudinary from "../libs/cloudinary";

export const uploadPhoto = async (photo: File) => {
  const formData = new FormData();
  formData.append("file", photo);

  const file = formData.get("file") as File | null;

  if (!file) {
    return { error: "No file uploaded", status: 400 };
  }

  // Convert file to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload to Cloudinary
  const uploadResponse = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "nextjs_uploads" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

  const imageUrl = ((await uploadResponse) as any).secure_url;
  if (imageUrl) {
    return { url: imageUrl };
  }
};
