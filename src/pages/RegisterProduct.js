import { useState } from "react";
import FormData from "form-data";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterProduct() {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [estado, setEstado] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");

  const resetForm = () => {
    setNombre("");
    setCantidad("");
    setDescripcion("");
    setCategoria("");
    setEstado("");
    setPrecio("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("imagen", imagen);
      formData.append("nombre", nombre);
      formData.append("cantidad", cantidad);
      formData.append("descripcion", descripcion);
      formData.append("categoria", categoria);
      formData.append("estado", estado);
      formData.append("precio", precio);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(`${process.env.REACT_APP_API}/producto`, formData, config)
        .then(function (response) {
          const { data } = response;
          if (data?.errors) {
            data.errors.forEach(function (message) {
              toast.error(message.msg);
            });
          } else {
            resetForm();
            e.target.reset();
            toast.success(`Producto ${nombre} registrado`);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="form-register-product">
      <MDBContainer className="p-3 my-12 d-flex flex-column w-50">
        <MDBCard
          className="my-5 cascading-right"
          style={{
            background: "hsla(0, 0%, 100%, 0.55)",
            backdropFilter: "blur(30px)",
          }}
        >
          <MDBCardBody className="p-5 shadow-5 text-center">
            <h2 className="fw-bold mb-5">Registrar producto</h2>

            <MDBInput
              wrapperClass="mb-4"
              label="Nombre del producto"
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <div className="mb-4">
              <label className="form-label" htmlFor="imagen">
                Imagen del producto
              </label>
              <input
                accept="image/*"
                type="file"
                id=""
                className="form-control"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && file.type.substring(0, 5) === "image") {
                    setImagen(file);
                  } else {
                    setImagen(null);
                  }
                }}
                required
              />
            </div>

            <MDBInput
              wrapperClass="mb-4"
              label="Cantidad"
              id="cantidad"
              type="number"
              min="1"
              max="99999"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
            />

            <div className="mb-4">
              <FloatingLabel label="Descripción">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  required
                />
              </FloatingLabel>
            </div>

            <div className="form-outline mb-4">
              <Form.Select
                aria-label="Categoría"
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <option value="">Categoría</option>
                <option value="Tecnologia">Tecnología</option>
                <option value="Ferreteria">Ferretería</option>
                <option value="Juguetes">Juguetes</option>
              </Form.Select>
            </div>

            <div className="form-outline mb-4">
              <Form.Select
                aria-label="Estado"
                id="estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                required
              >
                <option value="">Estado</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Usado">Usado</option>
              </Form.Select>
            </div>

            <MDBInput
              wrapperClass="mb-4"
              label="Precio"
              id="precio"
              type="number"
              min="1000"
              max="999999999"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
            <MDBBtn className="w-100 mb-4" size="md">
              Registrar producto
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </form>
  );
}
