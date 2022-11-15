import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { BiCart } from "react-icons/bi";

export default function Menu() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              <Link to={"/home"} className="nav-link">
                Ecommerce MERN Stack
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
              <Nav>
                <Link to={"/cart"} className="nav-link">
                  <BiCart size="1.5rem" />
                  <span>Cart</span>
                </Link>
              </Nav>
            </Nav>
          </Container>
        </Navbar>
      </header>
    </div>
  );
}
