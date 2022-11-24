import { User } from "../models/User.js";
import { Rol } from "../models/Rol.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // alternativa buscando por email
    let user = await User.findOne({ email });
    if (user) throw { code: 11000 };

    user = new User({ email, password });
    await user.save();

    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.status(201).json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    //Alernativa por defecto mongoose
    if (error.code == 11000) {
      return res.status(400).json({ error: "Ya existe este usuario" });
    }
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).populate("rols");

    if (!user)
      return res.status(403).json({ error: "El usuario no está registrado" });

    const respuestaPassword = await user.comparePassword(password);
    if (!respuestaPassword)
      return res.status(403).json({ error: "Contraseña incorrecta" });

    const { token, rol, expiresIn, nombres } = generateToken(
      user.id,
      user.rols.nombre,
      user.nombres
    );
    req.user_id = user.id;
    generateRefreshToken(user.id, rol, res);
    return res.json({ token, rol, expiresIn, nombres });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};
