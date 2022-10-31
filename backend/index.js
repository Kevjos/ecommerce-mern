import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import vendedorRouter from "./routes/vendedor.route.js";

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/vendedor", vendedorRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("http://localhost:" + PORT));
