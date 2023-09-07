import { v2 as cloudinary } from "cloudinary";
import { CLOUD_NAME, API_KEY, API_SECRET } from "./environment.js";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

export async function uploadImage(filePath, folder) {
  return await cloudinary.uploader.upload(filePath, {
    folder,
  });
}

export async function deleteImage(publicId) {
  return await cloudinary.uploader.destroy(publicId);
}
