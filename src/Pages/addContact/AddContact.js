import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { contactContext } from "../../store/contactContext";
import DisplayToast from "../../Components/displayToast/DisplayToast";
import "./add-contact.css";
import Form from "react-bootstrap/Form";

const AddContact = () => {
  const [contact, setContact] = useState({ name: "", email: "", gender: "" });
  const [nameError, setNameError] = useState();
  const [emailError, setEmailError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [showToast, setShowToast] = useState(false);
  // const [selectedOption, setSelectedOption] = useState();
  const navigate = useNavigate();
  const { addContactHandler } = useContext(contactContext);

  const ContactSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = emailValidation(contact.email);
    const isNameValid = nameValidation(contact.name);
    const isGenderValid = genderValidaton(contact.gender);

    if (isEmailValid && isNameValid && isGenderValid) {
      addContactHandler(contact);
      setShowToast(true);
      setContact({ name: "", email: "", gender: "" });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate(`/`);
    }
  };

  const nameValidation = (name) => {
    const nameRegex = /^[A-Za-z]+$/;
    // nameRegex.test(name) this returns a true value
    // if any one of the condition is true then execute statement below
    if (name === "" || !nameRegex.test(name)) {
      setNameError("Name not Valid");
      return false;
    } else {
      setNameError("");
      return true;
    }
  };
  const setNameData = (e) => {
    setContact((prevContact) => ({
      ...prevContact,
      name: e.target.value,
    }));
    nameValidation(e.target.value);
  };

  const emailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !emailRegex.test(email)) {
      setEmailError("Enter a valid email address");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };
  const setEmailData = (e) => {
    setContact((prevEmail) => ({
      ...prevEmail,
      email: e.target.value,
    }));

    emailValidation(e.target.value);
  };
  const setGenderData = (e) => {
    setContact((prevContact) => ({
      ...prevContact,
      gender: e.target.value,
    }));
    genderValidaton(e.target.value);
  };

  const genderValidaton = (gender) => {
    if (gender === "") {
      setGenderError("Enter this field");
      return false;
    } else {
      setGenderError("");
      return true;
    }
  };

  return (
    <div className="add-contact-container">
      <form onSubmit={ContactSubmit} className="add-contact">
        <h2>Add Contact</h2>
        <div className="add-contact-input-grp">
          <label htmlFor="">Name</label>
          <input
            type="text"
            name=""
            value={contact.name}
            id=""
            placeholder="Name"
            className="add-contact-input"
            onChange={setNameData}
          />
        </div>
        {nameError && <div style={{ color: "red" }}>{nameError}</div>}
        <div className="add-contact-input-grp">
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="xyz@youremail.com"
            className="add-contact-input"
            value={contact.email}
            onChange={setEmailData}
          />
        </div>
        {emailError && <div style={{ color: "red" }}>{emailError}</div>}

        <div className="add-contact-input-grp">
          <label htmlFor="">Gender</label>
          <Form.Select
            aria-label="Default select example"
            style={{ borderColor: "black" }}
            value={contact.gender}
            onChange={setGenderData}
          >
            <option value="">Select from below</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Form.Select>
        </div>
        {genderError && <div style={{ color: "red" }}>{genderError}</div>}

        <button className="add-contact-input btn-input" type="submit">
          Submit
        </button>
        {
          <DisplayToast
            text="Contact has been Added"
            show={showToast}
            onToastFinish={(toastStatus) => {
              setShowToast(toastStatus);
            }}
          />
        }
      </form>
    </div>
  );
};

export default AddContact;
