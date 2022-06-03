import React, { useState } from 'react';
import { useContactsContext } from '../contexts/ContactContext';

const SearchContact = () => {
  const { searchContact } = useContactsContext();

  return (
    <div className='search_contact'>
      <i className="fa-solid fa-search"></i>
      <input 
        type="text" 
        onChange={e => searchContact(e.target.value)}
        placeholder='Search contacts by name, email or phone number...' />
    </div>
  );
}

export default SearchContact;
