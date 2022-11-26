import { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { useAuthContext } from "../contexts/authContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginObject = {
      email,
      password,
    };

    try {
      axios
        .post(`${process.env.REACT_APP_API}/auth/login`, loginObject)
        .then(function (response) {
          const { data } = response;
          if (data?.errors) {
            data.errors.forEach(function (message) {
              toast.error(message.msg);
            });
          } else {
            toast.success("Logueado");
            login(data.token, data.rol, data.nombres);
          }
        })
        .catch(function (err) {
          if (!err?.response) {
            toast.error("No hay respuesta del servidor");
          } else if (err.response?.status === 403) {
            toast.error("Email o contraseña incorrecta");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <MDBContainer fluid className="my-5">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Contraseña"
                  id="password"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <MDBBtn size="lg">Login</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
}
