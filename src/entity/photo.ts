import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { PhotoMetadata } from "./photoMetadata";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fileName: string;
  @Column()
  desc: string;
  @OneToOne(() => PhotoMetadata, (photoMetadata) => photoMetadata.photo, {
    cascade: true, // 自动保存
  })
  metadata: Relation<PhotoMetadata>;
}
