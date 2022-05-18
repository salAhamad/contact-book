import React from 'react';
import { useContactsContext } from '../contexts/ContactContext';
import ContactList from './ContactList';
import SearchContact from './SearchContact';

const Contacts = () => {
  const { contacts } =  useContactsContext();
  return (
    <>
      <div className='contacts_container'>
        <SearchContact />
        {
          contacts.map((contact, index) => {
            return <ContactList key={index} data={contact} />
          })
        }
      </div>
    </>
  );
}

export default Contacts;
