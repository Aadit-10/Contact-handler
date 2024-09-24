import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { contactContext } from "../../store/contactContext";
import "./pagination.css";

const Pagination = () => {
  const { currentPage, totalContacts, paginate, contactsPerPage } =
    useContext(contactContext);
  const totalPages = Math.ceil(totalContacts / contactsPerPage);

  return (
    <div className="pagination-container">
      <ButtonGroup aria-label="Basic example">
        <Button
          variant="secondary"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </Button>
        <span className="span-inside-buttongroup">{currentPage}</span>
        <Button
          variant="secondary"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          {">>"}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Pagination;
