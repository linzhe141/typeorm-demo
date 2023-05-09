import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Author } from "./author";
import { PhotoMetadata } from "./photoMetadata";
import { Album } from "./album";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fileName: string;
  @Column()
  desc: string;

  // 这个字段没有在photo数据库中
  @OneToOne(() => PhotoMetadata, (photoMetadata) => photoMetadata.photo, {
    cascade: true, // 自动保存
  })
  metadata: Relation<PhotoMetadata>;

  @ManyToOne(()=>Author,(author) => author.photos)
  author:Author

  @ManyToMany(()=>Album, (album)=>album.photos,{
    cascade: ["insert"]
  })
  albums:Album[]
}
