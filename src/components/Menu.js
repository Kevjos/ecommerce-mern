import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Menu() {
  return (
    <div className="App">
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
      {/*
      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
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
              <Route exact path="*" component={(props) => <NotFoundPage />} />
            </div>
          </Col>
        </Row>
      </Container>
      */}
    </div>
  );
}
