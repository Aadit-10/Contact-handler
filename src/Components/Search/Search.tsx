import React, { useContext } from "react";
import Form from "react-bootstrap/Form";
import "./search.css";

interface SearchProps {
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}
const Search: React.FC<SearchProps> = ({ onChangeSearch, searchValue }) => {
  return (
    <div className="search-container">
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Seach Name"
            onChange={onChangeSearch}
            value={searchValue}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default Search;
