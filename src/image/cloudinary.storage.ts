import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "nestjs_uploads",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  } as any,
});
