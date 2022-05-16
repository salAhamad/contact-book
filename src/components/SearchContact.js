import React from 'react';

const SearchContact = () => {
  return (
    <div className='search_contact'>
      <i className="fa-solid fa-search"></i>
      <input type="text" placeholder='Search contacts by name, email or phone number...' />
    </div>
  );
}

export default SearchContact;
