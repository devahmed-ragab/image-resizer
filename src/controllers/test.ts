// import config from "../config";
// import sharp from "sharp";
// import * as path from "path";
// import fs from "fs";
// import request from "request";
// import { log } from "console";

// // cheack  if dir "thumb" exist  ? continue : create it f
// // check if pic with name picname-width-heaight exist  f
// // if true get it
// // not ? call shrp fun to crate on

// const PUBLIC_DIR = path.resolve("public");

// const THUMB_PHOTOS_DIR = path.join(PUBLIC_DIR, "thumb");
// const ORGINAL_PHOTOS_DIR = path.join(PUBLIC_DIR, "full");

// type Image = {
//   imageName: string;
//   width: number;
//   height: number;
//   extintion: string;
//   // targetSaveName?:string = this.imageName+ ''
// };

// function thumbDirectoryExists(): boolean {
//   console.log("thumbDirectoryExists() :", fs.existsSync(THUMB_PHOTOS_DIR));
//   return fs.existsSync(THUMB_PHOTOS_DIR);
// }

// function createThumbDirectory(): void {
//   console.log("creating thummb directory");
//   try {
//     fs.mkdirSync(THUMB_PHOTOS_DIR);
//   } catch (e) {
//     console.log("e -> createThumbDirectory : ");
//     throw new Error("could't create directory: " + THUMB_PHOTOS_DIR);
//   }
// }

// async function resizeImage(img: Image): Promise<Buffer> {
//   // I only resize image if it's not exist in thumb file.
//   console.log("test == ", path.resolve( ));
//   console.log(path.join(ORGINAL_PHOTOS_DIR, img.imageName + ".jpg"));

//   const IMAGE_PATH = path.join(ORGINAL_PHOTOS_DIR, img.imageName + ".jpg");
//   const image = sharp(IMAGE_PATH);
//   const buffer = await image
//     .resize({ width: img.width, height: img.height })
//     .toBuffer({
//       resolveWithObject: true,
//     });
//   return buffer.data;
// }

// async function findImage(img: Image) {
//   //http://localhost:3000/
//   const imageFullPath = path.join(
//     THUMB_PHOTOS_DIR,
//     img.imageName + img.width + "x" + img.height + img.extintion
//   );
//   console.log(config.domain.localHost + imageFullPath);
//   request(config.domain.localHost + imageFullPath, (err, response, body) => {
//     const image = body;
//     console.log("response image  = ", response);
//     console.log("Request image  = ", image);
//     console.log("err image  = ", err);
//   });
//   // try {
//   //   const fetchImage = await sharp(imageFullPath);
//   //   console.log(`metadata ->>> ${fetchImage}`);
//   // } catch (err) {
//   //   console.log("fetchImage", err);
//   // }
// }

// resizeImage({
//   width: 70,
//   height: 70,
//   imageName: "fjord",
//   extintion: ".jpg",
// });

// async function main(): Promise<fs.ReadStream> {
//   const img: Image = {
//     width: 70,
//     height: 70,
//     imageName: "fjord",
//     extintion: ".jpg",
//   };
//   const TARGET_IMAGE_NAME =
//     img.imageName + img.width + "x" + img.height + img.extintion;
//   const TARGET_PATH = path.join(THUMB_PHOTOS_DIR, TARGET_IMAGE_NAME);

//   if (!thumbDirectoryExists()) {
//     createThumbDirectory();
//   }
//   try {
//     const saveImage = await resizeImage(img);
//     saveImage.toFile(TARGET_PATH);

//     return;
//   } catch (e) {
//     throw Error(`could't resize image : ${img.imageName}`);
//   }
// }

// function resizeImageTest(img: Image) {
//   const TARGET_IMAGE_NAME =
//     img.imageName + img.width + "x" + img.height + img.extintion;
//   const TARGET_PATH = path.join(THUMB_PHOTOS_DIR, TARGET_IMAGE_NAME);
//   const readStream = fs.createReadStream(TARGET_PATH);
//   return readStream;
// }

// // export = resizeImageTest;
// export = resizeImage;
