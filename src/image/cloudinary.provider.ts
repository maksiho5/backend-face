import { v2 as cloudinary } from "cloudinary";
import { ConfigService } from "@nestjs/config";

export const CloudinaryProvider = {
  provide: "CLOUDINARY",
  useFactory: (configService: ConfigService) => {
    cloudinary.config({
      cloud_name: "duicqhxva",
      api_key: "872442333633571",
      api_secret: "rOdbuvMoMuMVP0d56Tqx8jbZMiI",
    });
    return cloudinary;
  },
  inject: [ConfigService],
};
