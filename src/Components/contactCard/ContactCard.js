import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./contact-card.css";

const ContactCard = ({ contact, onDelete }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const { id, name, email, gender } = contact;
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="contact-card-container">
      <div>
        <div className="contact-card-show contact-card-show-1 ">{name} </div>
        <div className="contact-card-show playwrite-cu-regular ">{email}</div>
        <div className="contact-card-show playwrite-cu-regular ">{gender}</div>
      </div>
      <div className="contact-card-btngrp">
        <Button
          variant="secondary"
          className="contact-card-edit "
          onClick={handleEdit}
        >
          <span class="material-symbols-outlined">edit</span>
          Edit
        </Button>

        <Button
          variant="danger"
          className="contact-card-delete "
          onClick={() => {
            handleShow();
          }}
        >
          <span class="material-symbols-outlined">Delete</span>
          Delete
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this component
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                onDelete(id);
                handleClose();
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ContactCard;
