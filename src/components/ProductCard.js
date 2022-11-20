import React from "react";
import { Container, Row, Button, Card } from "react-bootstrap";
import { BsCartPlus } from "react-icons/bs";

export default function ProductCard({ page, results, search }) {
  let display;
  if (results) {
    display = results.map((x) => {
      let { _id, nombre, imagen, precio } = x;
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
                <Card.Img variant="top" src={imagen} className="img-fluid" />
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
                COP. <span className="h3">{precio}</span>
              </Card.Title>
              <Button
                //onClick={() => addItemToCart(product)}
                className="d-flex align-item-center m-auto border-0"
              >
                <BsCartPlus size="1.8rem" />
                Agregar al carrito
              </Button>
            </Card.Body>
          </Card>
        </div>
      );
    });
  } else if (search) {
    display = (
      <Container className="py-4">
        <Row>
          <div className="card text-center">
            <div className="card-body">No se encontró el producto.</div>
          </div>
        </Row>
      </Container>
    );
  } else {
    display = (
      <Container className="py-4">
        <Row>
          <div className="card text-center">
            <div className="card-body">No hay productos registrados.</div>
          </div>
        </Row>
      </Container>
    );
  }

  return <>{display}</>;
}
