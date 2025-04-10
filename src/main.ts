import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { join } from "path";
import * as express from "express";
import * as dotenv from "dotenv";

dotenv.config(); // загружаем переменные окружения

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Раздача статики (например, для изображений)
  app.use("/uploads", express.static(join(__dirname, "..", "uploads")));

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
