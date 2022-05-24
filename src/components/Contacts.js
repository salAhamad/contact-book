import React, { useState } from 'react';
import { useContactsContext } from '../contexts/ContactContext';
import ContactList from './ContactList';
import SearchContact from './SearchContact';

import UpdateContact from '../components/UpdateContact';

const Contacts = () => {
  const { contacts } =  useContactsContext();

  const [editContactToggle, setEditContact] = useState(false);
  
  
  const closePopup = e => {
    e.preventDefault();
    setEditContact(false)
  }
  const editContact = (e) => setEditContact(true);

  return (
    <>
      <div className='contacts_container'>
        <SearchContact />
        {
          contacts.map((contact, index) => {
            return <ContactList key={index} data={contact} editContact={editContact} />
          })
        }
        {editContactToggle && <UpdateContact closePopup={closePopup} />}
      </div>
    </>
  );
}

export default Contacts;
