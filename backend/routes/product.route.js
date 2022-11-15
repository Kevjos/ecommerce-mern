import { Router } from "express";
import {
  registerProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import { bodyRegisterProductValidator } from "../validators/validatorProduct.js";
import { verifyFile } from "../middlewares/verifyFile.js";
//import { sanitizeQueryValidator } from "../validators/validateQueryAndParams.js";

const router = Router();

router.post("/", bodyRegisterProductValidator, verifyFile, registerProduct);
//router.get("/search/categoria", getProductByCategory);
router.get("/search", getProducts);
//router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
