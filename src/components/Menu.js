import { useContext } from "react";
import { useAuthContext } from "../contexts/authContext";
import { CartContext } from "../contexts/cartContext";
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

export default function Menu() {
  const { isAuthenticated, isSeller, isBuyer } = useAuthContext();
  const { cartOpen, productsLength, total } = useContext(CartContext);

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
                      <BiCart size="2rem" />
                      {cartOpen && productsLength > 0 && (
                        <span
                          style={{
                            position: "relative",
                            left: "-21px",
                            top: "-18px",
                            color: "red",
                          }}
                        >
                          {productsLength}
                        </span>
                      )}
                      <span
                        style={{
                          marginLeft:
                            cartOpen && productsLength > 0 ? "-10px" : 0,
                        }}
                      >
                        Cart
                      </span>
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
