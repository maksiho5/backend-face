import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ImageModule } from "./image/image.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: ConfigService.get<string>("MONGODB_URI"), // Получаем URI из переменной окружения
      }),
      inject: [ConfigService], 
    }),

    ImageModule,
  ],
})
export class AppModule {}
