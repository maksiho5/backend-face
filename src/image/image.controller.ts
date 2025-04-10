import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage, StorageEngine } from "multer";
import { ImageService } from "./image.service";
import * as faceapi from "face-api.js";
import { createCanvas, loadImage } from "canvas";
import { Request } from "express";
import path from "path";

@Controller("image")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post("uploadFile")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (
          req: Request,
          file: Express.Multer.File,
          cb: (error: Error | null, filename: string) => void,
        ) => {
          if (!file.originalname) {
            cb(new Error("Invalid file"), "");
            return;
          }
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }), // ✅ Явно указываем тип
    }),
  )
  async uploadImage(
    @Body() name: { name: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Сохраняем путь изображения в MongoDB
    const savedImage = await this.imageService.saveImage(
      file.filename,
      file.path,
      name.name,
    );
    return { message: "Изображение загружено!", file: savedImage };
  }



  @Get("getFace")
  async getFace() {
    return await this.imageService.findAll();
  }
}
