import { createContext, useContext, useEffect, useState } from "react";

const ContactContexts = createContext();

export function ContactsContextProvider({ children }) {
  
  const LOCAL_STORAGE_KEY = "constacts";
  const [contacts, setContacts] = useState([]);

  const [createNewContact, setCreateNewContact] = useState(null);


  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts])
  
  
  
  return <ContactContexts.Provider value={{
    createNewContact
  }}>{ children }</ContactContexts.Provider>;
}

export function useContactsContext() {
  return useContext(ContactContexts)
}