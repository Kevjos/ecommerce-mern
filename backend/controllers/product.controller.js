import { Product } from "../models/Product.js";
import { uploadImage } from "../services/storage.js";

export const registerProduct = async (req, res) => {
  try {
    let { nombre, cantidad, descripcion, categoria, estado, precio } = req.body;

    let filename = "";

    if (req.files?.imagen) {
      filename = await uploadImage(req.files.imagen);
      if (filename == "Formato inválido") {
        return res.status(400).send({ msg: "Solo se permiten imagenes" });
      }
    }

    const product = new Product({
      nombre: nombre,
      imagen: filename,
      cantidad: cantidad,
      descripcion: descripcion,
      categoria: categoria,
      estado: estado,
      precio: precio,
    });

    const newProduct = await product.save();
    return res.status(201).json({ newProduct });
  } catch (error) {
    return res.status(500).json({ error: "error de servidor" });
  }
};

export const findByName = async (req, res) => {
  try {
    const product = await Product.findOne({ nombre: req.nombre });

    if (!product)
      return res.status(404).json({ error: "No existe el producto" });

    return res.json({ product });
  } catch (error) {
    return res.status(500).json({ error: "error de servidor" });
  }
};
