import { OneToMany, PrimaryGeneratedColumn,Column, Entity } from "typeorm";
import { Photo } from "./photo";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name:string;

  // 常用参数是2个函数，返回对应关系
  @OneToMany(()=>Photo,(photo)=>photo.author,{
    cascade: true
  })
  photos:Photo[]
}