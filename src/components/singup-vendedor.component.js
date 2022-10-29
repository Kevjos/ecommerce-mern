import React, { Component } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCheckbox,
} from "mdb-react-ui-kit";

export default class Singup extends Component {
  render() {
    return (
      <MDBContainer fluid className="my-5">
        <MDBRow className="g-0 align-items-center">
          <MDBCol col="6">
            <MDBCard
              className="my-5 cascading-right"
              style={{
                background: "hsla(0, 0%, 100%, 0.55)",
                backdropFilter: "blur(30px)",
              }}
            >
              <MDBCardBody className="p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Registrar vendedor</h2>

                <MDBRow>
                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Nombres"
                      id="nombres"
                      type="text"
                    />
                  </MDBCol>

                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Apellidos"
                      id="apellidos"
                      type="text"
                    />
                  </MDBCol>
                </MDBRow>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Documento de identificación"
                  id="idDocumento"
                  type="number"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Correo"
                  id="correo"
                  type="email"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Dirección del establecimiento"
                  id="direccion"
                  type="text"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="NIT"
                  id="nit"
                  type="text"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Celular"
                  id="celular"
                  type="number"
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Contraseña"
                  id="password"
                  type="password"
                />

                <MDBBtn className="w-100 mb-4" size="md">
                  Crear cuenta
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol col="6">
            <img
              src="https://img.freepik.com/vector-gratis/analistas-demanda-dandose-mano-pantallas-portatiles-planificando-demanda-futura-planificacion-demanda-analisis-demanda-ilustracion-concepto-pronostico-ventas-digitales_335657-2098.jpg?w=996&t=st=1666993683~exp=1666994283~hmac=fb914bc7c956ab3353e2c1833cef2537e7982fa490c324bc4dd1e54fd3fdb2ef"
              className="w-100 rounded-4 shadow-4"
              alt=""
              fluid="true"
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
