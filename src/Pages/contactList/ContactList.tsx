import React, { useState, useContext, useEffect } from "react";
import { contactContext } from "../../store/contactContext";
import "./contact-list.css";
import ContactCard from "../../Components/contactCard/ContactCard";
import DisplayToast from "../../Components/displayToast/DisplayToast";

const ContactList = () => {
  const [showToast, setShowToast] = useState<boolean>(false);

  interface Contact {
    id: any;
    name: string;
    email: string;
    gender: string;
  }
  interface ContactContextType {
    foundContacts: Contact[];
    setFoundContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
    deleteContact: (id: any) => Promise<void>;
    addContactHandler: (contact: Omit<Contact, "id">) => Promise<void>;
    getAllContacWithSearch: (searchWord?: string) => Promise<void>;
    currentPage: number;
    totalContacts: number;
    paginate: (pageNumber: number) => void;
    contactsPerPage: number;
    renderCurrentPagintionContacts: () => Contact[];
    onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchValue: string;
    emptySearchText: string;
    showPagination: boolean;
  }

  const contactCtx = useContext(contactContext);
  if (!contactCtx) {
    // Handle the case where the context is null (maybe show a loading state or an error)
    return <div>Loading...</div>;
  }
  const {
    deleteContact,
    getAllContacWithSearch,
    renderCurrentPagintionContacts,
    emptySearchText,
  }: any = contactCtx;

  const currentContacts: Contact[] = renderCurrentPagintionContacts();
  const deleteContactHandler = (id: any) => {
    setShowToast(true);
    deleteContact(id);
  };
  // console.log("Contact List :", contacts);
  useEffect(() => {
    getAllContacWithSearch();
  }, []);

  const renderContactList = currentContacts?.map((contact: Contact) => {
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
