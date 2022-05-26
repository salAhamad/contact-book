import { createContext, useContext, useEffect, useState } from "react";

const ContactContexts = createContext();

export function ContactsContextProvider({ children }) {
  const COUTNRIES_API_URL = 'http://localhost:3000/coutries';
  const STATES_API_URL = 'http://localhost:3000/states';
  const CITIES_API_URL = 'http://localhost:3000/cities';

  const LOCAL_STORAGE_KEY = "constacts";
  
  const getLocalStorateData = () => {
    const retrievedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return retrievedData ? retrievedData : []
  }

  const [contacts, setContacts] = useState(getLocalStorateData());
  const [editContactData, setEditContactData] = useState([]);
  

  // const [createNewContact, setCreateNewContact] = useState(null);

  function getContactData(cont_id) {
    setEditContactData(contacts.filter(contact => contact.contactId === cont_id))
    console.log(editContactData);
  }  

  function addNewContact(data) {
    const retrievedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    const updatedData = [data, ...retrievedData];
    setContacts(updatedData);
  }

  function updateContactDate(data) {
    const restItems = getLocalStorateData().filter(item => item.contactId !== data.contactId);    
    setContacts([data, ...restItems]);
  }

  function deleteContact(data) {
    setContacts(getLocalStorateData().filter(item => item.contactId !== data))
  }
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]) 
  
  return <ContactContexts.Provider value={{
    COUTNRIES_API_URL,
    STATES_API_URL,
    CITIES_API_URL,
    contacts, 
    editContactData,
    getContactData,
    addNewContact, 
    updateContactDate,
    deleteContact,
  }}>{ children }</ContactContexts.Provider>;
}

export function useContactsContext() {
  return useContext(ContactContexts)
}