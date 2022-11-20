import jwt from "jsonwebtoken";
export const generateToken = (uid, rol) => {
  //const expiresIn = 60 * 15;
  const expiresIn = "1d";

  try {
    const token = jwt.sign({ uid, rol }, process.env.JWT_SECRET, { expiresIn });
    return { token, rol, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (uid, rol, res) => {
  const expiresIn = 60 * 60 * 24 * 30;
  try {
    const refreshToken = jwt.sign({ uid, rol }, process.env.JWT_REFRESH, {
      expiresIn,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODO === "developer"),
      expires: new Date(Date.now() + expiresIn * 1000),
    });
  } catch (error) {
    console.log(error);
  }
};

export const tokenVerificationErrors = {
  ["invalid signature"]: "La firma del JWT no es válida",
  ["jwt expired"]: "JWT expirado",
  ["invalid token"]: "Token no válido",
  ["No Bearer"]: "Utiliza formato Bearer",
  ["jwt malformed"]: "JW formato no válido",
};