import { useState } from "react";
import Header from "./components/Header";
import Contacts from "./components/Contacts";
import CreateNew from './components/CreateNew';
import UpdateContact from './components/UpdateContact';
import { ContactsContextProvider } from "./contexts/ContactContext";

import './App.scss'

function App() {

  const [createNewContact, setCcreateNewContact] = useState(false)
  const [editContact, setEditContact] = useState(false);

  const createNewForm = e => {
    setCcreateNewContact(true)
  };

  const closePopup = e => {
    e.preventDefault();
    setCcreateNewContact(false)
  }


  return (
    <ContactsContextProvider>
      <Header createNewForm={createNewForm} />
      <Contacts />
      {createNewContact && <CreateNew closePopup={closePopup} /> }
      {editContact && <UpdateContact />}
    </ContactsContextProvider>
  );
}

export default App;
