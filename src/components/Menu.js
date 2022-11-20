import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import { BiCart } from "react-icons/bi";
import {
  LOGIN,
  LOGOUT,
  PRIVATE,
  REGISTERPRODUCT,
  HOME,
  PRODUCTS,
} from "../config/router/paths";
import { useAuthContext } from "../contexts/authContext";

export default function Menu() {
  const { isAuthenticated, isSeller, isBuyer } = useAuthContext();

  return (
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              <Link to={HOME} className="nav-link">
                Ecommerce MERN Stack
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              {!isAuthenticated ? (
                <>
                  <Nav>
                    <Link to={HOME} className="nav-link">
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
                    <Link to={LOGIN} className="nav-link">
                      Iniciar sesión
                    </Link>
                  </Nav>
                </>
              ) : null}

              {isAuthenticated && isSeller && (
                <>
                  <Nav>
                    <Link to={REGISTERPRODUCT} className="nav-link">
                      Registrar producto
                    </Link>
                  </Nav>
                  <Nav>
                    <Link to={PRODUCTS} className="nav-link">
                      Productos
                    </Link>
                  </Nav>
                </>
              )}
              {isAuthenticated ? (
                <>
                  <Nav>
                    <Link to={LOGOUT} className="nav-link">
                      Cerrar sesión
                    </Link>
                  </Nav>
                </>
              ) : null}
              {!isAuthenticated || isBuyer ? (
                <>
                  <Nav>
                    <Link to={"/cart"} className="nav-link">
                      <BiCart size="1.5rem" />
                      <span>Cart</span>
                    </Link>
                  </Nav>
                </>
              ) : null}
            </Nav>
          </Container>
        </Navbar>
      </header>
    </div>
  );
}
