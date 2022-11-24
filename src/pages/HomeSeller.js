import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { EDITPRODUCT } from "../config/router/paths";
import axios from "axios";
import { formatNumber } from "../config/formatNumber";
import { useAuthContext } from "../contexts/authContext";
import toast from "react-hot-toast";

export default function HomeSeller() {
  let [productos, updateProductos] = useState([]);
  const { names } = useAuthContext();

  const token = localStorage.getItem("TOKEN");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  let api = `${process.env.REACT_APP_API}/productos/myproducts`;

  async function cargarProductos() {
    await axios
      .get(api, config)
      .then(({ data }) => updateProductos(data.data))
      .catch(function (error) {
        if (error) {
          updateProductos(error.response.data);
          console.log(error);
        }
      });
  }

  useEffect(() => {
    cargarProductos();
  }, [api]);

  const deleteProduct = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API}/productos/` + id, config)
      .then((res) => {
        toast.success("Producto eliminado!");
        cargarProductos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container className="py-4">
      <Row>
        <div className="card text-center">
          {productos.length > 0 ? (
            <>
              <div className="card-body">Productos del vendedor {names}.</div>
              <div className="table-responsive">
                <table className="table align-middle mb-0 bg-white">
                  <thead className="bg-light">
                    <tr>
                      <th>Nombre</th>
                      <th>Cantidad</th>
                      <th>Descripción</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th>Estado</th>
                      <th>-</th>
                      <th>-</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((productsList) => (
                      <tr key={productsList._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={`${process.env.REACT_APP_API}/productos/image/${productsList._id}`}
                              alt={productsList.nombre}
                              style={{ width: "100px", height: "100px" }}
                              className="rounded-circle"
                            />

                            <div className="ms-3">
                              <p className="fw-bold mb-1">
                                {productsList.nombre}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="fw-normal mb-1">
                            {productsList.cantidad}
                          </p>
                        </td>
                        <td>
                          <p className="fw-normal mb-1">
                            {productsList.descripcion}
                          </p>
                        </td>
                        <td>{productsList.categoria}</td>
                        <td>
                          <p className="fw-normal mb-1">
                            {formatNumber(productsList.precio)}
                          </p>
                        </td>
                        <td>
                          <p className="fw-normal mb-1">
                            {productsList.estado}
                          </p>
                        </td>

                        <td>
                          <Link
                            className="btn btn-warning btn-rounded"
                            to={`/seller/ediproduct/${productsList._id}`}
                          >
                            Actualizar
                          </Link>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger btn-rounded"
                            onClick={() => deleteProduct(productsList._id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <div className="card-body">No hay productos.</div>
            </>
          )}
        </div>
      </Row>
    </Container>
  );
}
