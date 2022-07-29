import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { FaSearch } from "react-icons/fa";
const SearchBar = ({ onSubmit }) => {
  const [term, setTerm] = useState("");

  function onFormSubmit(event) {
    event.preventDefault();
    onSubmit(term);
  }

  return (
    <div className="ui segment">

      <Form className="d-flex" onSubmit={onFormSubmit}>
        <Form.Control
          onChange={(e) => setTerm(e.target.value)}
          type="search"
          placeholder="Search"
          className="col-2 shadow me-2"
          aria-label="Search"
          style={{ borderRadius: ".75em" }}
        />
        <div
          style={{
            lineHeight: "3",
            color: "rgba(0, 100, 0, 0.836)",
            border: "none",
            fontSize: "1.1em"
          }}
        >
          <FaSearch></FaSearch>
        </div>
      </Form>
    </div>
  );
};

export default SearchBar;
