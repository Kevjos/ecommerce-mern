import { body } from "express-validator";
import { validationResultExpress } from "./validationResultExpress.js";

export const bodyLoginValidator = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
  validationResultExpress,
];
