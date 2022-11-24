import { Product } from "../models/Product.js";
import { uploadImage } from "../services/storage.js";
//import cloudinary from "../utils/cloudinary.js";
//import fs from "fs";

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

    /*
    const cloudinary_image = await cloudinary.uploader.upload(filename, {
      folder: "products",
    });
    */
    const product = new Product({
      nombre: nombre,
      //imagen: filename,
      /*
      imagen: {
        public_id: cloudinary_image.public_id,
        url: cloudinary_image.secure_url,
      },
      */
      imagen: {
        data: req.files.imagen.data,
        contentType: req.files.imagen.mimetype,
      },
      cantidad: cantidad,
      descripcion: descripcion,
      categoria: categoria,
      estado: estado,
      precio: precio,
      userId: req.uid,
    });

    const newProduct = await product.save();
    return res.status(201).json({ newProduct });
  } catch (error) {
    return res.status(500).json({ error: "error de servidor" });
    //console.log(error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const name = req.query.name ? req.query.name : "";

    const page = req.query.page ? parseInt(req.query.page) : 1;

    let query = { nombre: { $regex: name }, cantidad: { $gt: 0 } };

    const options = {
      page,
      select: "-imagen",
      limit: 20,
      customLabels: myCustomLabels,
    };

    const products = await Product.paginate(query, options);

    if (products.totalProducts == 0) {
      if (name != "") {
        return res
          .status(404)
          .json({ error: `No existe el producto ${name}.` });
      }
      return res.status(404).json({ error: `No hay productos registrados.` });
    }

    return res.json({ products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const getProductById = async (req, res) => {
  try {
    let { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({ error: `El producto no está registrado` });

    return res.json({ data: product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const getImageProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select(
      "imagen"
    );

    if (product.imagen.data) {
      res.set("Content-Type", product.imagen.contentType);
      return res.send(product.imagen.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByOwner = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.uid }).select("-imagen");

    if (!products)
      return res.status(404).json({ error: `No hay productos registrados` });

    return res.json({ data: products });
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
      select: "-imagen",
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
    //let imageName = product.imagen.split("/")[4];

    if (!product)
      return res.status(404).json({ error: "No existe el producto" });

    if (product.userId != req.uid)
      return res.status(401).json({ error: "No le pertenece ese producto" });
    /*
    fs.unlink(`.${process.env.APP_DIR_STORAGE}/${imageName}`, (err) => {
      if (err) {
        throw err;
      }
    });
    */
    await product.remove();

    return res.status(200).json({ msg: "Producto eliminado" });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato id incorrecto" });
    }
    return res.status(500).json({
      error: "error del servidor",
    });
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

    if (product.userId != req.uid)
      return res.status(401).json({ error: "No le pertenece ese producto" });

    if (req.files?.imagen) {
      //let imageName = product.imagen.split("/")[4];
      filename = await uploadImage(req.files.imagen);
      if (filename == "Formato inválido") {
        return res.status(400).send({ msg: "Solo se permiten imagenes" });
      }
      /*
      fs.unlink(`.${process.env.APP_DIR_STORAGE}/${imageName}`, (err) => {
        if (err) {
          throw err;
        } else {
          console.log(err);
        }
      });
      */

      product.imagen = {
        data: req.files.imagen.data,
        contentType: req.files.imagen.mimetype,
      };
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
