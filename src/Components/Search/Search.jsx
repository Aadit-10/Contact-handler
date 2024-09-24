import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import "./search.css";

const Search = ({ onChangeSearch, searchValue }) => {
  return (
    <div className="search-container">
      <Form>
        <Form.Group
          className="mb-3"
          onChange={onChangeSearch}
          value={searchValue}
        >
          <Form.Control type="email" placeholder="Seach Name" />
        </Form.Group>
      </Form>
    </div>
  );
};

export default Search;
