import { useState } from "react";
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
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterComprador() {
  const [nombres, setNombres] = useState("prueba comprador2");
  const [apellidos, setApellidos] = useState("prueba comprador2");
  const [email, setEmail] = useState("comprador1@gmail.com");
  const [celular, setCelular] = useState("1111111111");
  const [direccion, setDireccion] = useState("direccion del comprador");
  const [idDocumento, setIdDocumento] = useState("1111111");
  const [password, setPassword] = useState("123456");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const compradorObject = {
      nombres,
      apellidos,
      celular,
      direccion,
      email,
      idDocumento,
      password,
    };

    try {
      axios
        .post(`${process.env.REACT_APP_API}/comprador`, compradorObject)
        .then(function (response) {
          const { data } = response;
          if (data?.errors) {
            data.errors.forEach(function (message) {
              toast.error(message.msg);
            });
          } else {
            toast.success("Registrado con éxito");
            //window.location.href = "/login";
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
                <h2 className="fw-bold mb-5">Registrar comprador</h2>

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
                  label="Dirección"
                  id="direccion"
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
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

                <MDBBtn className="w-100 mb-4" size="md">
                  Crear cuenta
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol col="6">
            <img
              src="https://img.freepik.com/vector-gratis/coleccion-personas-cargando-bolsas-compra_23-2148209436.jpg?w=996&t=st=1666992939~exp=1666993539~hmac=2a0ff88bf790ff5ae294a8d526c304a80a3a1e902159102724e9a76d79c78b3a"
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
