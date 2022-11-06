import * as dotenv from "dotenv";
dotenv.config();
import path from "path";

export const uploadImage = (image) => {
  try {
    let imageName = "";

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const extensionName = path.extname(image.name); // fetch the file extension

    const allowedExtension = [".png", ".PNG", ".jpg", ".JPG", ".jpeg", ".JPEG"];

    imageName = uniqueSuffix + extensionName;
    const urlExt = `${process.env.APP_HOST}:${process.env.APP_PORT}/public/${imageName}`;
    const urlInt = `.${process.env.APP_DIR_STORAGE}/${imageName}`;

    if (!allowedExtension.includes(extensionName)) {
      return "Formato inválido";
    } else {
      image.mv(urlInt, (err) => {
        if (err) {
          return err;
        }
      });
      return urlExt;
    }
  } catch (err) {
    return err;
  }
};
