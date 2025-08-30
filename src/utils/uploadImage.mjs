import cloudinary from "../config/cloudinary.mjs";

async function uploadImage(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      transformation: [
        { width: 500, height: 500, crop: "limit" },
        { quality: "auto", fetch_format: "auto" },
      ],
    });
    return result;
  } catch (error) {
    throw new Error("Error uploading image");
  }
}

export default uploadImage;
