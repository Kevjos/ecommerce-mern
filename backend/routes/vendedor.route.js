import { Router } from "express";
import { createVendedor } from "../controllers/vendedor.controller.js";

import { bodyRegisterVendedorValidator } from "../middlewares/validatorManager.js";

const router = Router();

router.post("/", bodyRegisterVendedorValidator, createVendedor);

export default router;
