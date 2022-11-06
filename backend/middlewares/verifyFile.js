export const verifyFile = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(200).json({ msg: "No hay imagenes" });
  }

  next();
};
