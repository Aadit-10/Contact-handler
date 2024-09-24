import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./edit.css";
import { contactContext } from "../../store/contactContext";
import Form from "react-bootstrap/Form";
import api from "../../api/contact";

const Edit = () => {
  const { foundContacts, setFoundContacts } = useContext(contactContext);

  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState({ name: "", email: "", gender: "" });
  const contactToEdit = foundContacts.find((contact) => contact.id === id);
  console.log("Contact to edit :", contactToEdit);

  /**/
  useEffect(() => {
    if (contactToEdit) {
      setContact({
        name: contactToEdit.name,
        email: contactToEdit.email,
        gender: contactToEdit.gender,
      });
    }
  }, [contactToEdit]);

  const updateContactHandler = async () => {
    try {
      const response = await api.put(`/contacts/${id}`, contact);
      const updatedContacts = foundContacts.map((c) =>
        c.id === parseInt(id) ? { ...c, ...contact } : c
      );
      setFoundContacts(updatedContacts);
      navigate(`/`);
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateContactHandler();
  };

  return (
    <div className="edit-contact-container">
      <div className="edit-contact">
        <h2>Edit Contact</h2>
        <div className="edit-contact-input-grp">
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            id=""
            placeholder="Name"
            className="edit-contact-input"
            onChange={handleInputChange}
          />
        </div>
        <div className="edit-contact-input-grp">
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            placeholder="xyz@youremail.com"
            className="edit-contact-input"
            value={contact.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="add-contact-input-grp">
          <label htmlFor="">Gender</label>
          <Form.Select
            name="gender"
            aria-label="Default select example"
            style={{ borderColor: "black" }}
            value={contact.gender}
            onChange={handleInputChange}
          >
            <option value="">Select from below</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Form.Select>
        </div>
        <button
          className="edit-contact-input btn-input-edit"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <div className="underline"></div>
      </div>
    </div>
  );
};

export default Edit;
