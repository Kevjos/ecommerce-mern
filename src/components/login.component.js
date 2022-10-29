import React, { Component } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";

export default class Login extends Component {
  render() {
    return (
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12">
            <MDBCard
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "500px" }}
            >
              <MDBCardBody className="p-5 w-100 d-flex flex-column">
                <h2 className="fw-bold mb-2 text-center">Iniciar sesión</h2>
                <p className="text-white-50 mb-3">
                  Por favor ingrese su usuario y contraseña!
                </p>

                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Correo electrónico"
                  id="email"
                  type="email"
                  size="lg"
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Contraseña"
                  id="password"
                  type="password"
                  size="lg"
                />

                <MDBCheckbox
                  name="flexCheck"
                  id="flexCheckDefault"
                  className="mb-4"
                  label="Remember password"
                />

                <MDBBtn size="lg">Login</MDBBtn>

                <hr className="my-4" />

                <MDBBtn
                  className="mb-2 w-100"
                  size="lg"
                  style={{ backgroundColor: "#dd4b39" }}
                >
                  <MDBIcon fab icon="google" className="mx-2" />
                  Sign in with google
                </MDBBtn>

                <MDBBtn
                  className="mb-4 w-100"
                  size="lg"
                  style={{ backgroundColor: "#3b5998" }}
                >
                  <MDBIcon fab icon="facebook-f" className="mx-2" />
                  Sign in with facebook
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
