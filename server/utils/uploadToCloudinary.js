import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "myImages" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export default uploadToCloudinary