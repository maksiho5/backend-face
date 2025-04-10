import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";
import { Image, ImageSchema } from "./image.schema";
import { CloudinaryProvider } from "./cloudinary.provider";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]), // ✅ Подключаем модель
    ConfigModule,
  ],
  controllers: [ImageController],
  providers: [ImageService, CloudinaryProvider],

  exports: ['CLOUDINARY'],
})
export class ImageModule {}