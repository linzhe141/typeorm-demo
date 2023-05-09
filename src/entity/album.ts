import { Entity, PrimaryGeneratedColumn,Column, ManyToMany, JoinTable } from 'typeorm';
import { Photo } from './photo';
@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  name:string

  @ManyToMany(()=>Photo, (photo)=>photo.albums, {
    cascade: ["insert"]
  })
  @JoinTable() // 自动创建连接表 
  photos:Photo[]
}