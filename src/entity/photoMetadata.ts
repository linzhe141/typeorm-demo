import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Photo } from "./photo";

@Entity()
export class PhotoMetadata {
  @PrimaryGeneratedColumn()
  id: number;
  @Column("int")
  height: number;
  @Column("int")
  width: number;
  @Column("varchar")
  comment: string;

  // 一对一
  @OneToOne(() => Photo, (photo) => photo.metadata)
  // 表明关系的这一方将拥有该关系。 
  // ?一对一这是必填的，表示photo的组件作为外键
  @JoinColumn()
  photo: Relation<Photo>; // 循环引用问题
}
