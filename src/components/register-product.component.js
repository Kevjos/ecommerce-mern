import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

export default class RegisterProduct extends Component {
  render() {
    return (
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
              id="nombreProducto"
              type="text"
            />
            <div className="mb-4">
              <label className="form-label" htmlFor="imageProduct">
                Imagen del producto
              </label>
              <input type="file" className="form-control" id="imageProduct" />
            </div>

            <MDBInput
              wrapperClass="mb-4"
              label="Cantidad"
              id="cantidadProducto"
              type="number"
            />

            <div className="mb-4">
              <FloatingLabel controlId="descripcion" label="Descripción">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
            </div>

            <div className="form-outline mb-4">
              <Form.Select aria-label="Categoría">
                <option>Categoría</option>
                <option value="Tecnologia">Tecnología</option>
                <option value="Ferreteria">Ferretería</option>
                <option value="Juguetes">Juguetes</option>
              </Form.Select>
            </div>

            <div className="form-outline mb-4">
              <Form.Select aria-label="Estado">
                <option>Estado</option>
                <option value="Nuevo">Nuevo</option>
                <option value="Usado">Usado</option>
              </Form.Select>
            </div>

            <MDBInput
              wrapperClass="mb-4"
              label="Precio"
              id="precio"
              type="number"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Contraseña"
              id="password"
              type="password"
            />

            <MDBBtn className="w-100 mb-4" size="md">
              Registrar producto
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>

        {/*  
          <MDBCol col="6">
            <img
              src="https://img.freepik.com/vector-gratis/analistas-demanda-dandose-mano-pantallas-portatiles-planificando-demanda-futura-planificacion-demanda-analisis-demanda-ilustracion-concepto-pronostico-ventas-digitales_335657-2098.jpg?w=996&t=st=1666993683~exp=1666994283~hmac=fb914bc7c956ab3353e2c1833cef2537e7982fa490c324bc4dd1e54fd3fdb2ef"
              class="w-100 rounded-4 shadow-4"
              alt=""
              fluid
            />
          </MDBCol>
          */}
      </MDBContainer>
    );
  }
}
