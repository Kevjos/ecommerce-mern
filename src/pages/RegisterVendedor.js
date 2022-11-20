import { useState } from "react";
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
import { useNavigate } from "react-router-dom";

export default function RegisterVendedor() {
  const [nombres, setNombres] = useState("prueba");
  const [apellidos, setApellidos] = useState("prueba");
  const [email, setEmail] = useState("prueba@prueba.co");
  const [celular, setCelular] = useState("0123456789");
  const [direccionEstablecimiento, setDireccionEstablecimiento] = useState(
    "direccion de prueba"
  );
  const [idDocumento, setIdDocumento] = useState("1234567890");
  const [password, setPassword] = useState("123456");
  const [nit, setNit] = useState("0123456789");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vendedorObject = {
      nombres,
      apellidos,
      celular,
      direccionEstablecimiento,
      email,
      idDocumento,
      password,
      nit,
    };

    try {
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
            navigate("/login");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
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
                      value={nombres}
                      onChange={(e) => setNombres(e.target.value)}
                      required
                    />
                  </MDBCol>

                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Apellidos"
                      id="apellidos"
                      type="text"
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                      required
                    />
                  </MDBCol>
                </MDBRow>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Documento de identificación"
                  id="idDocumento"
                  type="number"
                  value={idDocumento}
                  onChange={(e) => setIdDocumento(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Correo"
                  id="correo"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Dirección del establecimiento"
                  id="direccionEstablecimiento"
                  type="text"
                  value={direccionEstablecimiento}
                  onChange={(e) => setDireccionEstablecimiento(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="NIT"
                  id="nit"
                  type="text"
                  value={nit}
                  onChange={(e) => setNit(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Celular"
                  id="celular"
                  type="number"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Contraseña"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
