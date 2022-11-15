import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    imagen: {
      type: String,
      required: true,
      trim: true,
    },
    cantidad: {
      type: Number,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    categoria: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    estado: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    precio: {
      type: Number,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.methods.setImgUrl = function setImgUrl(filename) {
  this.imagen = `${process.env.APP_HOST}:${process.env.APP_PORT}/public/${filename}`;
};

productSchema.plugin(mongoosePaginate);

export const Product = model("Product", productSchema);
