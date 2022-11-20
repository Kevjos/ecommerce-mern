import { Router } from "express";
import { createComprador } from "../controllers/comprador.controller.js";

import { bodyRegisterCompradorValidator } from "../validators/validatorComprador.js";

const router = Router();

router.post("/", bodyRegisterCompradorValidator, createComprador);

export default router;
