import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import { Router } from '@reach/router'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//import { RegisterVendedor, HomePrincipal, IniciarSesion } from "./pages";

import Home from "./components/home.component";
import Login from "./components/login.component";
import Singup from "./components/singup-vendedor.component";
import NotFoundPage from "./components/NotFoundPage";
import RegisterComprador from "./components/register-comprador.component";
import RegisterProduct from "./components/register-product.component";

function App() {
  return (
    /*
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route index element={<HomePrincipal />} />
        <Route path="/home" element={<HomePrincipal />} />
        <Route path="/singupvendedor" element={<RegisterVendedor />} />
        <Route path="/login" element={<IniciarSesion />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    */
    <div className="App">
      <Router>
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/home"} className="nav-link">
                  App React MERN Stack
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/home"} className="nav-link">
                    Home
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/singupvendedor"} className="nav-link">
                    Registrar vendedor
                  </Link>
                </Nav>
                <Nav>
                  <Link to={"/singupcomprador"} className="nav-link">
                    Registrar comprador
                  </Link>
                </Nav>
                <Nav>
                  <Link to={"/login"} className="nav-link">
                    Iniciar sesión
                  </Link>
                </Nav>
                <Nav>
                  <Link to={"/registerproduct"} className="nav-link">
                    Registrar producto
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={(props) => <Home {...props} />}
                  />
                  <Route
                    exact
                    path="/home"
                    component={(props) => <Home {...props} />}
                  />
                  <Route
                    exact
                    path="/singupvendedor"
                    component={(props) => <Singup {...props} />}
                  />
                  <Route
                    exact
                    path="/singupcomprador"
                    component={(props) => <RegisterComprador {...props} />}
                  />
                  <Route
                    exact
                    path="/login"
                    component={(props) => <Login {...props} />}
                  />
                  <Route
                    exact
                    path="/registerproduct"
                    component={(props) => <RegisterProduct {...props} />}
                  />
                  <Route
                    exact
                    path="*"
                    component={(props) => <NotFoundPage />}
                  />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
}
/*
function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/singupvendedor">Singup vendedor</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
*/
export default App;
