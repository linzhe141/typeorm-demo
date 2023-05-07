import { QueryPhoto, UpdatePhoto } from "../dto/photoDto";
import { Photo } from "../entity/photoEntity";
import { DataSource, Like } from "typeorm";
export class PhotoService {
  photo;
  constructor(private readonly dbs: DataSource) {
    this.photo = this.dbs.getRepository(Photo);
  }
  create(data: Photo) {
    const result = this.photo.save(data);
    return result;
  }
  findAll() {
    const result = this.photo.find();
    return result;
  }
  async find(query: QueryPhoto) {
    const { fileName, desc } = query;
    const data = await this.photo.find({
      where: { fileName: Like(`%${fileName}%`), desc: Like(`%${desc}%`) },
    });
    return data;
  }

  async findOne(id: number) {
    return await this.photo.findOneBy({ id });
  }

  async update(photo: UpdatePhoto) {
    return await this.photo.save(photo);
  }

  async delete(id: number) {
    const item = await this.findOne(id);
    if (item) {
      return await this.photo.remove(item);
    }
    return { message: "id不存在" };
  }
}
