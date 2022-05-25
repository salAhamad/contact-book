import { createContext, useContext, useEffect, useState } from "react";

const ContactContexts = createContext();

export function ContactsContextProvider({ children }) {
  
  const LOCAL_STORAGE_KEY = "constacts";
  
  const getLocalStorateData = () => {
    const retrievedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return retrievedData ? retrievedData : []
  }

  const [contacts, setContacts] = useState(getLocalStorateData());
  const [editContactData, setEditContactData] = useState([]);
  

  // const [createNewContact, setCreateNewContact] = useState(null);

  function getContactData(elem) {
    setEditContactData(contacts.filter(contact => contact.contactId === elem))
    console.log(editContactData.contactId);
  }


  function addNewContact(data) {
    const retrievedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    const updatedData = [...retrievedData, data];
    setContacts(updatedData);
  }
  function updateContactDate(data, c_Id) {
    console.log(c_Id)
    const retrievedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    const updatedData = [...retrievedData, data];
    setContacts(updatedData);
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts])
  
  
  
  return <ContactContexts.Provider value={{
    addNewContact, 
    contacts, 
    getContactData,
    editContactData,
    updateContactDate
  }}>{ children }</ContactContexts.Provider>;
}

export function useContactsContext() {
  return useContext(ContactContexts)
}