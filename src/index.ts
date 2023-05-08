import "reflect-metadata";
import { DataSource } from "typeorm";
import { Photo } from "./entity/photo";
import { PhotoMetadata } from "./entity/photoMetadata";
import { PhotoController } from "./controller/photoController";
export const db = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "admin",
  database: "testtypeorm",
  entities: [Photo, PhotoMetadata],
  synchronize: true,
  logging: false,
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
  await photoRepository.save({
    fileName: "test自动保存",
    desc: "xxxxxxx1111111111",
    metadata: {
      width: 20,
      height: 30,
      comment: "yyyyyyyy11111111111",
    },
  });
  const allData = await photoController.findAll();
  console.log(allData);
  process.exit(0);
}
