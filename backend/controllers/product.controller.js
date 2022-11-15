import { Product } from "../models/Product.js";
import { uploadImage } from "../services/storage.js";

const myCustomLabels = {
  totalDocs: "totalProducts",
  docs: "productsList",
};

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

export const getProducts = async (req, res) => {
  try {
    const name = req.query.name ? req.query.name : "";

    const page = req.query.page ? parseInt(req.query.page) : 1;

    let query = { nombre: { $regex: name } };

    const options = {
      page,
      limit: 20,
      customLabels: myCustomLabels,
    };

    const products = await Product.paginate(query, options);

    if (products.totalProducts == 0)
      return res.status(404).json({ error: `No existe el producto ${name}` });

    return res.json({ products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const getProductByCategory = async (req, res) => {
  try {
    const categoriaProducto = req.query.q;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    let query = { categoria: categoriaProducto };

    const options = {
      page,
      limit: 20,
      customLabels: myCustomLabels,
    };

    const product = await Product.paginate(query, options);

    if (product.totalProducts == 0)
      return res.status(404).json({
        error: `No existen productos en la categoría ${categoriaProducto}`,
      });

    return res.json({ product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({ error: "No existe el producto" });
    /*
    if (!product._id.equals(req._id))
      return res.status(401).json({ error: "No le pertenece ese producto" });
      */

    await product.remove();

    return res.status(200).json({ msg: "Producto eliminado" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato id incorrecto" });
    }
    return res.status(500).json({ error: "error del servidor" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, cantidad, descripcion, categoria, estado, precio } =
      req.body;

    let filename = "";

    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({ error: "No existe el producto" });

    /*
    if (!product._id.equals(req._id))
      return res.status(401).json({ error: "No le pertenece ese producto" });
      */

    if (req.files?.imagen) {
      filename = await uploadImage(req.files.imagen);
      if (filename == "Formato inválido") {
        return res.status(400).send({ msg: "Solo se permiten imagenes" });
      }
      product.imagen = filename;
    }

    product.nombre = nombre;
    product.cantidad = cantidad;
    product.descripcion = descripcion;
    product.categoria = categoria;
    product.estado = estado;
    product.precio = precio;
    await product.save();

    return res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato id incorrecto" });
    }
    return res.status(500).json({ error: "error del servidor" });
  }
};
