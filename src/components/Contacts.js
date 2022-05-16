import React from 'react';
import ContactList from './ContactList';
import SearchContact from './SearchContact';

const Contacts = () => {

  return (
    <>
      <div className='contacts_container'>
        <SearchContact />
        <ContactList />
      </div>
    </>
  );
}

export default Contacts;
