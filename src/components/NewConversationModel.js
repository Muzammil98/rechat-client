import React, { useRef, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";
import { useConversations } from "../context/ConversationsProvider";

export default function NewConversationModel({ closeModal }) {
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const { contacts } = useContacts();
  const { createConversations } = useConversations();
  function handleCheckBoxChange(contactID) {
    setSelectedContactIds((prev) => {
      if (prev.includes(contactID)) {
        return prev.filter((prevId) => {
          return contactID !== prevId;
        });
      } else {
        return [...prev, contactID];
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createConversations(selectedContactIds);
    closeModal();
  }
  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                label={contact.name}
                onChange={() => handleCheckBoxChange(contact.id)}
                value={selectedContactIds.includes(contact.id)}
              />
            </Form.Group>
          ))}
          <Button variant="danger" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
}
