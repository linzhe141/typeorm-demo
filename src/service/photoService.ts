import { QueryPhoto, UpdatePhoto } from "../dto/photoDto";
import { Photo } from "../entity/photo";
import { DataSource, Like,Repository } from "typeorm";
export class PhotoService {
  photo: Repository<Photo>;
  constructor(private readonly dbs: DataSource) {
    this.photo = this.dbs.getRepository(Photo);
  }
  create(data: Photo) {
    const result = this.photo.save(data);
    return result;
  }
  findAll() {
    const result = this.photo.find({
      relations: {
        metadata: true,
      },
    });
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
    // TODO
    const item = await this.findOne(photo.id);
    if (item) {
      return await this.photo.save(photo);
    }
    return { message: "id不存在" };
  }

  async delete(id: number) {
    const item = await this.findOne(id);
    if (item) {
      return await this.photo.remove(item);
    }
    return { message: "id不存在" };
  }
}
