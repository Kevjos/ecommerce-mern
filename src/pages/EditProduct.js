import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { Row } from "react-bootstrap";

export default function EditProduct() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [estado, setEstado] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");

  const token = localStorage.getItem("TOKEN");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  let { id } = useParams();

  let api = `${process.env.REACT_APP_API}/productos/` + id;

  async function cargarProductos() {
    await axios
      .get(api, config)
      .then(({ data }) => {
        const product = data.data;
        setNombre(product.nombre);
        setCategoria(product.categoria);
        setDescripcion(product.descripcion);
        setImagen(product.imagen);
        setCantidad(product.cantidad);
        setEstado(product.estado);
        setPrecio(product.precio);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    cargarProductos();
  }, [api]);

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

      axios
        .put(`${process.env.REACT_APP_API}/productos/` + id, formData, config)
        .then(function (response) {
          const { data } = response;
          navigate(`/seller/products`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="form-edit-product">
        <MDBContainer className="p-3 my-12 d-flex flex-column w-50">
          <MDBCard
            className="my-5 cascading-right"
            style={{
              background: "hsla(0, 0%, 100%, 0.55)",
              backdropFilter: "blur(30px)",
            }}
          >
            <MDBCardBody className="p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5">Editar producto</h2>

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
                <Form.Group
                  className="mb-3"
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select value={categoria} required>
                    <option disabled selected>
                      -- Seleccione --
                    </option>

                    <option value="Ferreteria">Ferretería</option>
                    <option value="Juguetes">Juguetes</option>
                    <option value="Tecnología">Tecnología</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="form-outline mb-4">
                <Form.Group
                  className="mb-3"
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    aria-label="Estado"
                    id="estado"
                    value={estado}
                    required
                  >
                    <option disabled selected>
                      -- Seleccione --
                    </option>
                    <option value="Usado">Usado</option>
                    <option value="Nuevo">Nuevo</option>
                  </Form.Select>
                </Form.Group>
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
              <div>
                <Row>
                  <MDBBtn className="w-100 mb-4" size="md">
                    Actualizar producto
                  </MDBBtn>
                  <MDBBtn
                    className="w-100 mb-4"
                    size="md"
                    onClick={() => navigate(-1)}
                  >
                    Cancelar
                  </MDBBtn>
                </Row>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </form>
    </div>
  );
}
