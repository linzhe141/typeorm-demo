import "reflect-metadata";
import { DataSource } from "typeorm";
import { Photo } from "./entity/photoEntity";
import { PhotoController } from "./controller/photoController";
export const db = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  database: "testtypeorm",
  entities: [Photo],
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
  const allData = await photoController.findAll();
  console.log(allData);
  console.log();
  console.log(await photoController.findOne(74));
  console.log();
  console.log(await photoController.find({ fileName: "10.png", desc: "" }));
  console.log();
  console.log(await photoController.delete(75));
  console.log();
  console.log(await photoController.delete(44));
  console.log(
    await photoController.update({
      id: 74,
      fileName: "test74.png",
      desc: "update~~~~~~~~~~",
    })
  );
  process.exit(0);
}
