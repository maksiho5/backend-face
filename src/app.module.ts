import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ImageModule } from "./image/image.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      "mongodb+srv://maltimusm:556356Aw@cluster0.t2q5g8a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    ),
    ImageModule,
  ],
})
export class AppModule {}
