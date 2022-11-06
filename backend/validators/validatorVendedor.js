import { body, check } from "express-validator";
import { validationResultExpress } from "./validationResultExpress.js";
import {
  findByEmail,
  findByIdDocument,
  findByNit,
} from "../controllers/vendedor.controller.js";

export const bodyRegisterVendedorValidator = [
  body("nombres")
    .trim()
    .not()
    .isEmpty()
    .withMessage("el campo nombres no puede estar vacío")
    .isLength({ min: 3, max: 9 })
    .isString()
    .withMessage("solo se permiten letras en el campo nombres"),
  body("apellidos")
    .trim()
    .not()
    .isEmpty()
    .withMessage("el campo apellidos no puede estar vacío")
    .isLength({ min: 3, max: 9 })
    .isString()
    .withMessage("solo se permiten letras en el campo apellidos"),
  body("direccionEstablecimiento")
    .trim()
    .not()
    .isEmpty()
    .withMessage("el campo dirección del establecimiento no puede estar vacío")
    .isLength({ min: 6, max: 20 })
    .withMessage(
      "el número de carácteres minímo en el campo dirección del establecimiento es 6 y máximo es 20"
    )
    .isString()
    .withMessage(
      "solo se permiten letras en el campo dirección del establecimiento"
    ),
  body("email", "Formato de email incorrecto")
    .trim()
    .not()
    .isEmpty()
    .withMessage("el campo email no puede estar vacío")
    .isEmail()
    .normalizeEmail(),

  check("email").custom((value) => {
    return findByEmail(value).then((user) => {
      if (user) {
        return Promise.reject("El correo ya está en uso");
      }
    });
  }),
  body(
    "idDocumento",
    "el campo documento de identificación permite un mínimo de 8 carácteres"
  )
    .trim()
    .not()
    .isEmpty()
    .withMessage("el campo documento de identificación no puede estar vacío")
    .isInt()
    .withMessage("el campo documento de identificación solo permite números")
    .isLength({ min: 7, max: 11 })
    .withMessage(
      "el número de documento de identificación debe tener entre 7 y 11 digitos"
    ),
  check("idDocumento").custom((value) => {
    return findByIdDocument(value).then((user) => {
      if (user) {
        return Promise.reject(
          "El documento de identificación ya está registrado"
        );
      }
    });
  }),
  body("celular")
    .trim()
    .not()
    .isEmpty()
    .withMessage("el campo celular no puede estar vacío")
    .isInt()
    .withMessage("solo se permiten números en el campo celular")
    .isLength({ min: 10, max: 10 })
    .withMessage("el número de celular debe tener 10 digitos"),
  body("password", "el campo contraseña debe tener mínimo 6 carácteres")
    .trim()
    .isLength({ min: 6 }),
  body("nit", "el campo NIT debe tener mínimo 10 carácteres")
    .trim()
    .isLength({ min: 10 }),
  check("nit").custom((value) => {
    return findByNit(value).then((user) => {
      if (user) {
        return Promise.reject("El nit ya está registrado");
      }
    });
  }),

  validationResultExpress,
];
