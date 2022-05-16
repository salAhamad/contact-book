import { useState } from "react";
import Header from "./components/Header";
import Contacts from "./components/Contacts";
import CreateNew from './components/CreateNew';
import { ContactsContextProvider } from "./contexts/ContactContext";

import './App.scss'

function App() {

  const [createNewContact, setCcreateNewContact] = useState(false)

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
    </ContactsContextProvider>
  );
}

export default App;
