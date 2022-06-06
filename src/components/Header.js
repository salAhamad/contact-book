import React from 'react';

const Header = ({ createNewForm }) => {  
  return (
    <header className='d-flex justify-content-between align-items-center p-3 py-2 px-lg-5 mb-lg-5 mb-2 border-bottom'>
      <div className="loft_block">
        <div className="logo">
          <i className="fa-solid fa-address-book"></i> Contacts
        </div>
      </div>
      <div className="right_block d-flex align-items-center">
        <button className='btn btn-primary px-lg-3 pe-lg-4 add_new_contact_btn' onClick={createNewForm}>
          <i className="fa-solid fa-plus me-lg-2"></i> <span className='hidden-xs'>Create New</span>
        </button>
        <div className="user_profile"><i className="fa-solid fa-user"></i></div>
      </div>
      
    </header>
  );
}

export default Header;
