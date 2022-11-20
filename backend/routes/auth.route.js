import { Router } from "express";
import { login, refreshToken, logout } from "../controllers/auth.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { bodyLoginValidator } from "../validators/validatorLogin.js";

const router = Router();

router.post("/login", bodyLoginValidator, login);

router.get("/logout", logout);

export default router;
