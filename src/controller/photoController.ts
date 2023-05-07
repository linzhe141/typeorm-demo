import type { DataSource } from "typeorm";
import { CreatePhoto, QueryPhoto, UpdatePhoto } from "../dto/photoDto";
import { Photo } from "../entity/photoEntity";
import { PhotoService } from "../service/photoService";

export class PhotoController {
  photoService: PhotoService;
  constructor(private readonly dbs: DataSource) {
    this.photoService = new PhotoService(this.dbs);
  }
  async create(user: CreatePhoto) {
    const { fileName, desc } = user;
    const photo = new Photo();
    photo.fileName = fileName;
    photo.desc = desc;
    await this.photoService.create(photo);
    return { message: "创建成功" };
  }

  async findAll() {
    const data = await this.photoService.findAll();
    return data;
  }

  async find(query: QueryPhoto) {
    const data = await this.photoService.find(query);
    return data;
  }

  async findOne(id: number) {
    return await this.photoService.findOne(id);
  }

  async update(photo: UpdatePhoto) {
    return this.photoService.update(photo);
  }

  async delete(id: number) {
    return this.photoService.delete(id);
  }
}
