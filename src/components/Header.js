import React from 'react';

const Header = ({ createNewForm }) => {  
  return (
    <header className='d-flex justify-content-between align-items-center p-4 px-5 border-bottom mb-5'>
      <div className="loft_block">
        <div className="logo">
          <i className="fa-solid fa-address-book"></i> Contacts
        </div>
      </div>
      <div className="right_block d-flex">
        <button className='btn btn-primary px-3 pe-4 add_new_contact_btn' onClick={createNewForm}>
          <i className="fa-solid fa-plus me-2"></i> Create New
        </button>
        <div className="user_profile"><i className="fa-solid fa-user"></i></div>
      </div>
      
    </header>
  );
}

export default Header;
