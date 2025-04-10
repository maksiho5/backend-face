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
import { storage } from "./cloudinary.storage";
@Controller("image")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post("uploadFile")
  @UseInterceptors(FileInterceptor("file", { storage }))
  async uploadImage(
    @Body() name: { name: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    // В Cloudinary уже будет ссылка на изображение
    const savedImage = await this.imageService.saveImage(
      file.filename,
      file.path, // Это теперь ссылка Cloudinary!
      name.name,
    );
    return { message: "Изображение загружено!", file: savedImage };
  }

  @Get("getFace")
  async getFace() {
    return await this.imageService.findAll();
  }
}
