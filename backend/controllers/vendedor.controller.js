import { User } from "../models/User.js";
import { Rol } from "../models/Rol.js";
import { sendEmail } from "../services/emails.js";

export const createVendedor = async (req, res) => {
  try {
    let rolId = await Rol.findOne({ nombre: "vendedor" });
    let {
      nombres,
      apellidos,
      idDocumento,
      direccionEstablecimiento,
      nit,
      celular,
      email,
      password,
    } = req.body;

    const vendedor = new User({
      nombres: nombres,
      apellidos: apellidos,
      idDocumento: idDocumento,
      direccionEstablecimiento: direccionEstablecimiento,
      nit: nit,
      telefono: celular,
      email: email,
      password: password,
      rols: rolId._id,
    });

    const newVendedor = await vendedor.save();

    await sendEmail(email);

    return res.status(201).json({ newVendedor });
  } catch (error) {
    return res.status(500).json({ error: "error de servidor" });
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

export const findByNit = async (req, res) => {
  try {
    const user = await User.findOne({ nit: req });

    if (!user) return false;

    return true;
  } catch (error) {
    return res.status(500).json({ error: "error de servidor" });
  }
};
