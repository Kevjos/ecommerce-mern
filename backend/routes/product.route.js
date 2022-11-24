import { Router } from "express";
import {
  registerProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByOwner,
  getImageProduct,
} from "../controllers/product.controller.js";

import { requireToken, isSeller } from "../middlewares/requireToken.js";

import { bodyRegisterProductValidator } from "../validators/validatorProduct.js";
import { verifyFile } from "../middlewares/verifyFile.js";

const router = Router();

router.post(
  "/",
  requireToken,
  isSeller,
  bodyRegisterProductValidator,
  verifyFile,
  registerProduct
);
//router.get("/search/categoria", getProductByCategory);
router.get("/search", getProducts);

router.get("/myproducts", requireToken, isSeller, getProductsByOwner);
router.get("/:id", requireToken, isSeller, getProductById);
router.get("/image/:productId", getImageProduct);
router.put("/:id", requireToken, isSeller, updateProduct);
router.delete("/:id", requireToken, isSeller, deleteProduct);

export default router;
