import React, { Component } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import axios from "axios";
import toast from "react-hot-toast";
import { Redirect } from "react-router-dom";

export default class Singup extends Component {
  //state = { redirect: null };
  constructor(props) {
    super(props);

    this.onChangeVendedorNombres = this.onChangeVendedorNombres.bind(this);
    this.onChangeVendedorApellidos = this.onChangeVendedorApellidos.bind(this);
    this.onChangeVendedorCelular = this.onChangeVendedorCelular.bind(this);
    this.onChangeVendedorDireccionEstablecimiento =
      this.onChangeVendedorDireccionEstablecimiento.bind(this);
    this.onChangeVendedorEmail = this.onChangeVendedorEmail.bind(this);
    this.onChangeVendedorIdDocumento =
      this.onChangeVendedorIdDocumento.bind(this);
    this.onChangeVendedorPassword = this.onChangeVendedorPassword.bind(this);
    this.onChangeVendedorNit = this.onChangeVendedorNit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nombres: "prueba",
      apellidos: "prueba",
      celular: "3100000000",
      direccionEstablecimiento: "direccion de prueba",
      email: "prueba@prueba.com",
      idDocumento: "012345678",
      password: "123456",
      nit: "0123456789",
      redirect: false,
    };
  }

  onChangeVendedorNombres(e) {
    this.setState({ nombres: e.target.value });
  }
  onChangeVendedorEmail(e) {
    this.setState({ email: e.target.value });
  }
  onChangeVendedorApellidos(e) {
    this.setState({ apellidos: e.target.value });
  }
  onChangeVendedorCelular(e) {
    this.setState({ celular: e.target.value });
  }
  onChangeVendedorIdDocumento(e) {
    this.setState({ idDocumento: e.target.value });
  }
  onChangeVendedorDireccionEstablecimiento(e) {
    this.setState({ direccionEstablecimiento: e.target.value });
  }
  onChangeVendedorNit(e) {
    this.setState({ nit: e.target.value });
  }
  onChangeVendedorPassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const vendedorObject = {
      nombres: this.state.nombres,
      apellidos: this.state.apellidos,
      celular: this.state.celular,
      direccionEstablecimiento: this.state.direccionEstablecimiento,
      email: this.state.email,
      idDocumento: this.state.idDocumento,
      password: this.state.password,
      nit: this.state.nit,
    };

    axios
      .post(`${process.env.REACT_APP_API}/vendedor`, vendedorObject)
      .then(function (response) {
        const { data } = response;
        if (data?.errors) {
          data.errors.forEach(function (message) {
            toast.error(message.msg);
          });
        } else {
          toast.success("Registrado con éxito");
          //return <Redirect to="/login" />;
          //window.location.href = "/login";
          this.setState({ redirect: true });
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    /*
    this.setState({
      nombres: "",
      apellidos: "",
      celular: "",
      direccionEstablecimiento: "",
      email: "",
      idDocumento: "",
      password: "",
      nit: "",
    });
    */
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <form onSubmit={this.onSubmit}>
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
                        value={this.state.nombres}
                        onChange={this.onChangeVendedorNombres}
                        required
                      />
                    </MDBCol>

                    <MDBCol col="6">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Apellidos"
                        id="apellidos"
                        type="text"
                        value={this.state.apellidos}
                        onChange={this.onChangeVendedorApellidos}
                        required
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Documento de identificación"
                    id="idDocumento"
                    type="number"
                    value={this.state.idDocumento}
                    onChange={this.onChangeVendedorIdDocumento}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Correo"
                    id="correo"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChangeVendedorEmail}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Dirección del establecimiento"
                    id="direccionEstablecimiento"
                    type="text"
                    value={this.state.direccionEstablecimiento}
                    onChange={this.onChangeVendedorDireccionEstablecimiento}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="NIT"
                    id="nit"
                    type="text"
                    value={this.state.nit}
                    onChange={this.onChangeVendedorNit}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Celular"
                    id="celular"
                    type="number"
                    value={this.state.celular}
                    onChange={this.onChangeVendedorCelular}
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Contraseña"
                    id="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChangeVendedorPassword}
                    required
                  />

                  <MDBBtn className="w-100 mb-4" size="md" type="submit">
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
      </form>
    );
  }
}
