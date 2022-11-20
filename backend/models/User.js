import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    nombres: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    apellidos: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    idDocumento: {
      type: Number,
      required: true,
      trim: true,
      index: { unique: true },
    },
    direccion: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    direccionEstablecimiento: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    nit: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    telefono: {
      type: Number,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
    rols: {
      type: Schema.Types.ObjectId,
      ref: "Rol",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Falló el hash de contraseña");
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password);
};

export const User = model("User", userSchema);
