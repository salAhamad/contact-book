import { createContext, useContext, useEffect, useState } from "react";

const ContactContexts = createContext();

export function ContactsContextProvider({ children }) {
  
  const LOCAL_STORAGE_KEY = "constacts";
  const [contacts, setContacts] = useState([]);

  const [createNewContact, setCreateNewContact] = useState(null);


  function addNewContact(data) {
    const retrievedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    const updatedData = [...retrievedData, data];
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
    setContacts(updatedData);
  }

  useEffect(() => {
    const retrievedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retrievedData) setContacts(retrievedData)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts])
  
  
  
  return <ContactContexts.Provider value={{
    createNewContact, addNewContact
  }}>{ children }</ContactContexts.Provider>;
}

export function useContactsContext() {
  return useContext(ContactContexts)
}