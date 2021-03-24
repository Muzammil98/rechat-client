import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}
export function ConversationsProvider({ children }) {
  const { contacts } = useContacts();
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  function createConversations(recipients) {
    setConversations((prev) => {
      return [...prev, { recipients, messages: [] }];
    });
  }
  const formattedConversations = conversations.map((conversations) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contat) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    return { ...conversation, recipients };
  });

  const value = {
    conversations: formattedConversations,
    createConversations,
  };
  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}
