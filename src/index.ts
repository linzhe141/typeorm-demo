import "reflect-metadata";
import { DataSource } from "typeorm";
import { Photo } from "./entity/photo";
import { PhotoMetadata } from "./entity/photoMetadata";
import { Author } from "./entity/author";
import { Album } from "./entity/album";
import { PhotoController } from "./controller/photoController";
export const db = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "linzhe141",
  database: "testtypeorm",
  entities: [Photo, PhotoMetadata, Author,Album],
  synchronize: true, // 根据代码同步表结构，生产环境关闭
  logging: false, // sql 日志
});

db.initialize()
  .then((connection) => {
    console.log("connection success");
    init(db);
  })
  .catch((error) => console.log("error=========>", error));

async function init(ds: DataSource) {
  const photoController = new PhotoController(ds);
  // for (let i = 0; i < 10; i++) {
  //   await photoController.create({
  //     fileName: `xxxxx${i + 1}.png`,
  //     desc: "xxxxxxxxx___" + (i + 1),
  //   });
  // }
  // console.log();
  // console.log(await photoController.findOne(74));
  // console.log();
  // console.log(await photoController.find({ fileName: "10.png", desc: "" }));
  // console.log();
  // console.log(await photoController.delete(75));
  // console.log();
  // console.log(await photoController.delete(44));
  // console.log(
  //   await photoController.update({
  //     id: 74,
  //     fileName: "test74.png",
  //     desc: "update~~~~~~~~~~",
  //   })
  // );
  // const photo = await photoController.findOne(84);
  // const photoMetadataRepository = ds.getRepository(PhotoMetadata);
  // const photoMetadata = new PhotoMetadata();
  // photoMetadata.width = 10;
  // photoMetadata.height = 10;
  // photoMetadata.comment = "xxxxxxxx";
  // photoMetadata.photo = photo!;
  // await photoMetadataRepository.save(photoMetadata);
  const photoRepository = ds.getRepository(Photo);
  const authorRepository = ds.getRepository(Author);
  const albumRepository = ds.getRepository(Album);
  // await photoRepository.save({
  //   fileName: "test自动保存",
  //   desc: "xxxxxxx1111111111",
  //   metadata: {
  //     width: 20,
  //     height: 30,
  //     comment: "yyyyyyyy11111111111",
  //   },
  // });
  // await authorRepository.save({
  //   name: 'linzhe1111',
  //   photos: [
  //     {
  //       fileName: "一对多__test自动保存01",
  //       desc: "一对多__xxxxxxx111111111101",
  //       metadata: {
  //         width: 201,
  //         height: 301,
  //         comment: "一对多__yyyyyyyy1111111111101",
  //       },
  //     },
  //     {
  //       fileName: "一对多__test自动保存02",
  //       desc: "一对多__xxxxxxx111111111102",
  //       metadata: {
  //         width: 202,
  //         height: 302,
  //         comment: "一对多__yyyyyyyy1111111111102",
  //       },
  //     }
  //   ]
  // } as Author)
  // const allData = await photoController.findAll();
  // console.log(allData);
  console.log();
  // 多层次关联关系查询
  // !加载多层关系可能会对性能产生一定影响
  // const allAuthor = await authorRepository.find({relations: ["photos", "photos.metadata"]})
  // console.log(JSON.stringify(allAuthor));
  console.log()
  // const album1  = {
  //   name: 'h1h1h1h1h1h1'
  // } as Album
  // const album2  = {
  //   name: 'h2h2h2h2h2h2'
  // } as Album
  // await albumRepository.save(album1)
  // await albumRepository.save(album2)
  // await photoRepository.save({
  //   fileName: 'i1i1i1i1i1',
  //   desc:'',
  //   albums: [album1,album2]
  // } as Photo)
  await albumRepository.save({
    name: 'qqqqqqqq',
    photos: [
      {fileName: 'q1q1q1q1', desc: "q1q1q1q1q1q1"},
      {fileName: 'q2q2q2q2', desc: "q2q2q2q2q2q2"}
    ]
  } as Album)
  await photoRepository.save({
    fileName: 'www',
    desc:'',
    albums: [{name:'w1w1w1'},{name:'w2w2w2'}]
  } as Photo)
  const all1 = await albumRepository.find({
    relations: {
      photos: true
    }
  })
  console.log(all1)
  const all2 = await photoRepository.find({
    relations: {
      albums: true
    }
  })
  console.log(all2)
  process.exit(0);
}
