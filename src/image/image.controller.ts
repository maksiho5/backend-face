import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { storage } from "./cloudinary.storage";  // Импортируем настройку хранения для Multer
import { ImageService } from "./image.service";

@Controller("image")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post("uploadFile")
  @UseInterceptors(FileInterceptor("file", { storage }))  // Используем CloudinaryStorage
  async uploadImage(
    @Body() name: { name: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    // В Cloudinary уже будет ссылка на изображение
    const savedImage = await this.imageService.saveImage(
      file.filename,  // Имя файла
      file.path,  // Это ссылка на изображение, полученная от Cloudinary
      name.name,
    );
    return { message: "Изображение загружено!", file: savedImage };
  }

  @Get("getFace")
  async getFace() {
    return await this.imageService.findAll();  // Получаем все изображения из базы данных
  }
}
