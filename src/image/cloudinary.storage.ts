import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Настройка хранилища для Multer с использованием Cloudinary
export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "nestjs_uploads",  // Папка для загрузок в Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],  // Форматы файлов
    transformation: [{ width: 500, height: 500, crop: "limit" }],  // Преобразование изображений
  },
});
