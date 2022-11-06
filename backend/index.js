import express from "express";
import "dotenv/config";
import fileUpload from "express-fileupload";

import "./database/connectdb.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import vendedorRouter from "./routes/vendedor.route.js";
import productRouter from "./routes/product.route.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// default options
app.use(
  fileUpload({
    limits: { fileSize: process.env.MAX_SIZE_UPLOAD * 1024 * 1024 },
    abortOnLimit: true,
    createParentPath: true,
  })
);

app.use(cors());
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));

app.use(
  "/public",
  express.static(`${__dirname}${process.env.APP_DIR_STORAGE}`)
);

app.use("/api/v1/vendedor", vendedorRouter);
app.use("/api/v1/producto", productRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(process.env.APP_HOST + ":" + PORT));
