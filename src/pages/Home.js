import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import axios from "axios";

export default function Home() {
  let [search, setSearch] = useState("");
  let [pageNumber, updatePageNumber] = useState(1);
  let [productos, updateProductos] = useState([]);

  let { totalPages, productsList } = productos;
  let api = `${process.env.REACT_APP_API}/productos/search?page=${pageNumber}&name=${search}`;

  useEffect(() => {
    (async function () {
      await axios(api)
        .then(({ data }) => updateProductos(data.products))
        .catch(function (error) {
          if (error.response) {
            updateProductos(error.response.data);
          }
        });
    })();
  }, [api]);
  return (
    <>
      <Container fluid className="pt-2">
        <Search setSearch={setSearch} updatePageNumber={updatePageNumber} />
        <Row>
          <ProductCard page="/" results={productsList} search={search} />
        </Row>
      </Container>
      <Pagination
        info={totalPages}
        pageNumber={pageNumber}
        updatePageNumber={updatePageNumber}
      />
    </>
  );
}
