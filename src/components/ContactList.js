import React from 'react';

import man_avatar from '../assets/images/man.png'
// import woman_avatar from '../assets/images/woman.png'

const ContactList = ({ data }) => {
  return (
    <div className='contact_list_container'>
      <div className="details">
        <div className="user_avatar">
          {/* <i className="fa-solid fa-user"></i> */}
          <img src={man_avatar} alt="" />
        </div>
        <div className="user-details">
          <h5 className="user_name">{`${data.firstName} ${data.lastName}`}</h5>
          <ul className="user_contacts">
            <li>
              <i className="fa-solid fa-phone"></i>
              {data.mobile}
            </li>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <a href={`mailto:${data.email}`} target="_blank" rel="noreferrer">{data.email}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="more_info_actions">
        <div className="more_info_button">
          <i className="fa-solid fa-ellipsis-v pe-none"></i>
        </div>
      </div>
    </div>
  );
}

export default ContactList;
