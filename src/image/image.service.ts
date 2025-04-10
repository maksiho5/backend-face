import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Image } from "./image.schema";
import { log } from "@tensorflow/tfjs";

@Injectable()
export class ImageService {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) { }

  async saveImage(
    filename: string,
    path: string,
    name: string,
  ): Promise<Image> {
    console.log(name);

    const findImage: Image | null = await this.imageModel
      .findOne({ filename: filename })
      .exec();
    if (findImage) {
      throw new BadRequestException({ message: `Файл уже существует.` });
    }
    const newImage = new this.imageModel({ filename, path, name });
    return newImage.save();
  }
  async findAll(): Promise<Image[]> {
    return this.imageModel.find().exec();
  }

}
