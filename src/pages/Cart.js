import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { CartContext } from "../contexts/cartContext";
import { BsCartCheck } from "react-icons/bs";
import { formatNumber } from "../config/formatNumber";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

export default function Cart() {
  const {
    cartItems,
    cartOpen,
    productsLength,
    total,
    addItemToCart,
    deleteItemToCart,
    removeItem,
    clearCart,
  } = useContext(CartContext);

  return (
    <>
      <section className="h-100 gradient-custom">
        {cartOpen && productsLength > 0 ? (
          <div className="container py-4">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">
                      Productos en tú carro: {productsLength}
                    </h5>
                  </div>
                  {cartItems.map((item, index) => {
                    return (
                      <div className="card-body" key={index}>
                        <div className="row">
                          <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                            <div
                              className="bg-image hover-overlay hover-zoom ripple rounded"
                              data-mdb-ripple-color="light"
                            >
                              <img
                                src={`${process.env.REACT_APP_API}/productos/image/${item._id}`}
                                className="w-100"
                                alt={item.nombre}
                              />
                              <a href="#!">
                                <div className="mask"></div>
                              </a>
                            </div>
                          </div>

                          <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                            <p>
                              <strong>{item.nombre}</strong>
                            </p>
                            <p>Precio: {formatNumber(item.precio)}</p>

                            <button
                              type="button"
                              className="btn btn-primary btn-sm me-1 mb-2"
                              data-mdb-toggle="tooltip"
                              title="Remove item"
                              onClick={() => removeItem(item)}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>

                          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <div
                              className="d-flex mb-4"
                              style={{ maxWidth: "300px" }}
                            >
                              <button
                                className="btn btn-primary px-3 me-2"
                                onClick={() =>
                                  deleteItemToCart(item, productsLength)
                                }
                              >
                                <i className="fas fa-minus"></i>
                              </button>

                              <div className="form-outline">
                                <input
                                  id="form1"
                                  min="0"
                                  name="quantity"
                                  value={item.cantidad}
                                  type="number"
                                  className="form-control"
                                />
                                <label className="form-label">
                                  {item.cantidad}
                                </label>
                              </div>

                              <button
                                className="btn btn-primary px-3 ms-2"
                                onClick={() => addItemToCart(item)}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>

                            <p className="text-start text-md-center">
                              <strong>
                                {formatNumber(item.precio * item.cantidad)}
                              </strong>
                            </p>
                          </div>
                        </div>
                        {cartItems.length > 1 && <hr className="my-4" />}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Summary</h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products
                        <span>{formatNumber(total)}</span>
                      </li>

                      <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total</strong>
                        </div>
                        <span>
                          <strong>{formatNumber(total)}</strong>
                        </span>
                      </li>
                    </ul>

                    <Button
                      type="button"
                      variant="success"
                      className="btn-block"
                    >
                      <BsCartCheck size="1.7rem" />
                      Pagar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h3 className="my-3 text-center">Tu carro está vacío</h3>
        )}
      </section>
    </>
  );
}
