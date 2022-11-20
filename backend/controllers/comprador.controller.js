import { User } from "../models/User.js";
import { Rol } from "../models/Rol.js";
import { sendEmail } from "../services/emails.js";

export const createComprador = async (req, res) => {
  try {
    let rolId = await Rol.findOne({ nombre: "comprador" });
    let {
      nombres,
      apellidos,
      idDocumento,
      direccion,
      celular,
      email,
      password,
    } = req.body;

    const comprador = new User({
      nombres,
      apellidos,
      idDocumento,
      direccion,
      telefono: celular,
      email,
      password,
      rols: rolId._id,
    });

    const newComprador = await comprador.save();

    await sendEmail(email);

    return res.status(201).json({ newComprador });
  } catch (error) {
    //return res.status(500).json({ error: "error de servidor" });
    console.log(error);
  }
};

export const findByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req });

    if (!user) return false;

    return true;
  } catch (error) {
    return res.status(500).json({ error: "error de servidor" });
  }
};

export const findByIdDocument = async (req, res) => {
  try {
    const user = await User.findOne({ idDocumento: req });

    if (!user) return false;

    return true;
  } catch (error) {
    return res.status(500).json({ error: "error de servidor" });
  }
};
