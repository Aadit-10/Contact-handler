import React, { useState, useContext, useEffect } from "react";
import { contactContext } from "../../store/contactContext";
import "./contact-list.css";
import ContactCard from "../../Components/contactCard/ContactCard";
import DisplayToast from "../../Components/displayToast/DisplayToast";

const ContactList = ({ emptySearchText }) => {
  const [showToast, setShowToast] = useState(false);

  const {
    deleteContact,
    getAllContacWithSearch,
    renderCurrentPagintionContacts,
  } = useContext(contactContext);

  const currentContacts = renderCurrentPagintionContacts();
  const deleteContactHandler = (id) => {
    setShowToast(true);
    deleteContact(id);
  };
  // console.log("Contact List :", contacts);
  useEffect(() => {
    getAllContacWithSearch();
  }, []);

  const renderContactList = currentContacts?.map((contact) => {
    return <ContactCard contact={contact} onDelete={deleteContactHandler} />;
  });

  return (
    <div className="contact-list-container">
      <div className="contact-list">
        <h2>Contact List</h2>
        {emptySearchText && (
          <div className="empty-search-text">{emptySearchText}</div>
        )}
        {renderContactList}
      </div>
      {
        <DisplayToast
          text="Contact has been Deleted"
          show={showToast}
          onToastFinish={(toastStatus) => {
            setShowToast(toastStatus);
          }}
        />
      }
    </div>
  );
};

export default ContactList;
