import React, { useContext } from "react";
import { Container, Row, Button, Card } from "react-bootstrap";
import CartContext from "../contexts/cartContext";
import { BsCartPlus } from "react-icons/bs";
import { formatNumber } from "../config/formatNumber";

export default function ProductCard({ page, results, search }) {
  const { addItemToCart } = useContext(CartContext);

  return (
    <>
      {results ? (
        results.map((product) => {
          let { _id, nombre, imagen, precio } = product;
          return (
            <div
              className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-4"
              key={_id}
            >
              <Card
                style={{ width: "18rem", height: "auto" }}
                className="text-center p-0 overflow-hidden shadow mx-auto mb-4"
              >
                <div
                  style={{
                    background: "white",
                    height: "15rem",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "inherit",
                  }}
                >
                  <div style={{ width: "15rem" }}>
                    <Card.Img
                      variant="top"
                      src={`${process.env.REACT_APP_API}/productos/image/${_id}`}
                      className="img-fluid"
                      alt={nombre}
                    />
                  </div>
                </div>
                <Card.Body>
                  <Card.Title
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {nombre}
                  </Card.Title>
                  <Card.Title>
                    <span className="h3">{formatNumber(precio)}</span>
                  </Card.Title>

                  <Button
                    onClick={() => addItemToCart(product)}
                    className="d-flex align-item-center m-auto border-0"
                  >
                    <BsCartPlus size="1.8rem" />
                    Agregar al carrito
                  </Button>
                </Card.Body>
              </Card>
            </div>
          );
        })
      ) : search ? (
        <Container className="py-4">
          <Row>
            <div className="card text-center">
              <div className="card-body">No se encontró el producto.</div>
            </div>
          </Row>
        </Container>
      ) : (
        <Container className="py-4">
          <Row>
            <div className="card text-center">
              <div className="card-body">No hay productos registrados.</div>
            </div>
          </Row>
        </Container>
      )}
    </>
  );
}
