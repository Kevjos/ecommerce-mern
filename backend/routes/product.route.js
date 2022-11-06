import { Router } from "express";
import { registerProduct } from "../controllers/product.controller.js";

import { bodyRegisterProductValidator } from "../validators/validatorProduct.js";
import { verifyFile } from "../middlewares/verifyFile.js";

const router = Router();

router.post("/", bodyRegisterProductValidator, verifyFile, registerProduct);

export default router;
