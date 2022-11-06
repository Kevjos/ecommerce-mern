import { check } from "express-validator";
import { validationResultExpress } from "./validationResultExpress.js";

export const bodyRegisterProductValidator = [
  check("nombre")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El campo nombre no puede estar vacío")
    .isString()
    .isLength({ min: 3, max: 250 })
    .withMessage("El campo nombre debe tener mínimo 3 letras"),
  check("cantidad")
    .trim()
    .not()
    .isEmpty()
    .withMessage("El campo cantidad no puede estar vacío")
    .isLength({ min: 1, max: 9999 })
    .withMessage(
      "El número de digitos minímo en el campo cantidad es 1 y máximo es 9999"
    )
    .isInt()
    .withMessage("El campo cantidad solo permite números"),
  check("descripcion")
    .trim()
    .not()
    .isEmpty()
    .withMessage("El campo descripción no puede estar vacío")
    .isString()
    .withMessage("Solo se permiten caracteres en el campo descripción")
    .isLength({ min: 20, max: 1000 })
    .withMessage(
      "El número de carácteres minímo en el campo descripción es 20 y máximo es 1000"
    ),
  check("precio")
    .trim()
    .not()
    .isEmpty()
    .withMessage("El campo precio no puede estar vacío")
    .isInt()
    .withMessage("Solo se permiten números en el campo precio")
    .isLength({ min: 4, max: 9 })
    .withMessage("El campo precio debe estar entre 1000 y 999999999"),
  check("categoria")
    .exists()
    .not()
    .isEmpty()
    .withMessage("el campo categoría no puede estar vacío"),
  check("estado")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El campo estado no puede estar vacío"),
  validationResultExpress,
];
