import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddContact from "../addContact/AddContact";
import ContactList from "../contactList/ContactList";
import Pagination from "../../Components/pagination/Pagination";
import Search from "../../Components/Search/Search";
import { contactContext } from "../../store/contactContext";

import { useNavigate } from "react-router-dom";
import "./home.css";
import Button from "react-bootstrap/Button";

const Home = () => {
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate(`/add/`);
  };
  const {
    onChangeSearch,
    searchValue,
    emptySearchText,
    showPagination,
    currentPage,
    totalContacts,
    paginate,
    contactsPerPage,
  } = useContext(contactContext);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Button variant="secondary" className="home-add" onClick={handleAdd}>
        Add Contact
        <span class="material-symbols-outlined">add</span>
      </Button>
      <Search onChangeSearch={onChangeSearch} searchValue={searchValue} />
      <ContactList />
      {showPagination && totalContacts > 3 && (
        <Pagination
          currentPage={currentPage}
          totalContacts={totalContacts}
          paginate={paginate}
          contactsPerPage={contactsPerPage}
        />
      )}
    </div>
  );
};

export default Home;
