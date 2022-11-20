import jwt from "jsonwebtoken";
import { Rol } from "../models/Rol.js";
import { tokenVerificationErrors } from "../utils/tokenManager.js";
export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (!token)
      return res.status(401).send({ error: "No existe el token en el header" });

    token = token.split(" ")[1];
    const { uid, rol } = jwt.verify(token, process.env.JWT_SECRET);

    req.uid = uid;
    req.rol = rol;

    next();
  } catch (error) {
    console.log(error.message);
    /*
    return res
      .status(401)
      .send({ error: tokenVerificationErrors[error.message] });
      */
  }
};

export const isSeller = async (req, res, next) => {
  try {
    //let rol = await Rol.findOne({ _id: req.rol });
    let rol = req.rol;
    rol === "vendedor"
      ? next()
      : res.status(401).send("you do not have the necessary permissions");
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    //let rol = await Rol.findOne({ _id: req.rol });
    let rol = req.rol;
    rol === "administrador"
      ? next()
      : res.status(401).send("you do not have the necessary permissions");
  } catch (error) {
    console.log(error);
  }
};
