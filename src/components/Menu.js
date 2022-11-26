import { useContext } from "react";
import { useAuthContext } from "../contexts/authContext";
import { CartContext } from "../contexts/cartContext";
import { Link } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  LOGIN,
  LOGOUT,
  REGISTERPRODUCT,
  HOME,
  PRODUCTS,
} from "../config/router/paths";

export default function Menu() {
  const { isAuthenticated, isSeller, isBuyer } = useAuthContext();
  const { cartOpen, productsLength } = useContext(CartContext);

  return (
    <div className="App">
      <header className="App-header">
        <Navbar expand="md" variant="dark" bg="dark">
          <Container>
            <Navbar.Brand>
              <Link to={HOME} className="nav-link">
                Ecommerce MERN Stack
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="justify-content-end"
            >
              <Nav>
                {!isAuthenticated ? (
                  <>
                    <Nav.Link>
                      <Link to={HOME} className="nav-link">
                        Home
                      </Link>
                    </Nav.Link>

                    <Nav.Link>
                      <Link to={"/singupvendedor"} className="nav-link">
                        Registrar vendedor
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to={"/singupcomprador"} className="nav-link">
                        Registrar comprador
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to={LOGIN} className="nav-link">
                        Iniciar sesión
                      </Link>
                    </Nav.Link>
                  </>
                ) : null}

                {!isAuthenticated || isBuyer ? (
                  <>
                    <Nav.Link>
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
                    </Nav.Link>
                  </>
                ) : null}
                {isAuthenticated && isSeller && (
                  <>
                    <Nav.Link>
                      <Link to={REGISTERPRODUCT} className="nav-link">
                        Registrar producto
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to={PRODUCTS} className="nav-link">
                        Productos
                      </Link>
                    </Nav.Link>
                  </>
                )}
                {isAuthenticated ? (
                  <>
                    <Nav.Link>
                      <Link to={LOGOUT} className="nav-link">
                        Cerrar sesión
                      </Link>
                    </Nav.Link>
                  </>
                ) : null}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/**
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarRightAlignExample"
              aria-controls="navbarRightAlignExample"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarRightAlignExample"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <Link to={HOME} className="nav-link">
                  Ecommerce MERN Stack
                </Link>
              </ul>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {!isAuthenticated ? (
                  <>
                    <Link to={HOME} className="nav-link">
                      Home
                    </Link>
                    <Link to={"/singupvendedor"} className="nav-link">
                      Registrar vendedor
                    </Link>
                    <Link to={"/singupcomprador"} className="nav-link">
                      Registrar comprador
                    </Link>
                    <Link to={LOGIN} className="nav-link">
                      Iniciar sesión
                    </Link>
                  </>
                ) : null}

                {isAuthenticated && isSeller && (
                  <>
                    <Link to={REGISTERPRODUCT} className="nav-link">
                      Registrar producto
                    </Link>
                    <Link to={PRODUCTS} className="nav-link">
                      Productos
                    </Link>
                  </>
                )}
                {isAuthenticated ? (
                  <>
                    <Link to={LOGOUT} className="nav-link">
                      Cerrar sesión
                    </Link>
                  </>
                ) : null}
                {!isAuthenticated || isBuyer ? (
                  <>
                    <Link to={"/cart"} className="nav-link">
                      <BiCart
                        size="2rem"
                        style={{
                          color: cartOpen && productsLength > 0 ? "red" : null,
                        }}
                      />
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
                  </>
                ) : null}
              </ul>
            </div>
          </div>
          
        </nav>
        */}
      </header>
    </div>
  );
}
