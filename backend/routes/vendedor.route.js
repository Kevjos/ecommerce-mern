import { Router } from "express";
import { createVendedor } from "../controllers/vendedor.controller.js";

import { bodyRegisterVendedorValidator } from "../validators/validatorVendedor.js";

const router = Router();

router.post("/", bodyRegisterVendedorValidator, createVendedor);

export default router;
