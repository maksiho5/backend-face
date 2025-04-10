import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";
import { Image, ImageSchema } from "./image.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]), // ✅ Подключаем модель
  ],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService], // ✅ Экспортируем сервис, если он нужен в других модулях
})
export class ImageModule {}