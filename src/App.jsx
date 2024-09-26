import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  redirectDocument,
} from "react-router-dom";
import api from "./api/contact";
import Header from "./Components/header/Header";
import AddContact from "./Pages/addContact/AddContact";

import Home from "./Pages/home/Home";
import Edit from "./Pages/edit/Edit";

import { contactContext } from "./store/contactContext";

function App() {
  // const LOCAL_STORAGE_KEY = "contacts";
  // const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [foundContacts, setFoundContacts] = useState([]);
  const [emptySearchText, setEmptySearchText] = useState("");
  const [showPagination, setShowPagination] = useState(true);
  const contactsPerPage = 3;
  const totalContacts = foundContacts.length;

  const onChangeSearch = (e) => {
    setCurrentPage(1);
    setSearchValue(e.target.value);
    getAllContacWithSearch(e.target.value);
  };

  const getAllContacWithSearch = async (searchWord = "") => {
    let data = [];
    const response = await api.get("/contacts");
    const allContacts = response.data;
    if (searchWord) {
      data = allContacts?.filter((contact) =>
        contact?.name?.includes(searchWord)
      );
    } else {
      data = allContacts;
    }
    console.log("Data", data);
    setFoundContacts(data);

    if (data.length == 0) {
      setEmptySearchText("No Data Found");
      setShowPagination(false);
    } else {
      setEmptySearchText("");
      setShowPagination(true);
    }
  };

  const renderCurrentPagintionContacts = () => {
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    return foundContacts.slice(indexOfFirstContact, indexOfLastContact);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const deleteContact = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      getAllContacWithSearch(searchValue);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // This is for storing all contacts to an array so that it can be shown
  // to the screen
  const addContactHandler = async (contact) => {
    const request = {
      id: Date.now().toString(),
      ...contact,
    };
    await api.post("/contacts", request);
  };

  return (
    <Router>
      <Header />
      <contactContext.Provider
        value={{
          foundContacts,
          setFoundContacts,
          deleteContact,
          addContactHandler,
          getAllContacWithSearch,
          currentPage,
          totalContacts,
          paginate,
          contactsPerPage,
          renderCurrentPagintionContacts,
          onChangeSearch,
          searchValue,
          emptySearchText,
          showPagination,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/add/" element={<AddContact />} />
        </Routes>
      </contactContext.Provider>
    </Router>
  );
}

export default App;
