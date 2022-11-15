import React from "react";
import { Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
export default function Search({ setSearch, updatePageNumber }) {
  let searchBtn = (e) => {
    e.preventDefault();
  };
  return (
    <Row className="justify-content-center">
      <Col xs={10} md={7} lg={6} xl={4} className="mb-3 mx-auto text-center">
        <form
          className={`d-flex flex-sm-row flex-column align-items-center justify-content-center gap-4 mb-5`}
        >
          <input
            onChange={(e) => {
              updatePageNumber(1);
              setSearch(e.target.value);
            }}
            placeholder="Buscar por nombre"
            type="text"
          />
          <button onClick={searchBtn} className={`btn btn-primary fs-5`}>
            Buscar
          </button>
        </form>
      </Col>
    </Row>
  );
}
