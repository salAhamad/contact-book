import React, { useState } from 'react';

import { useContactsContext } from '../contexts/ContactContext';

import man_avatar from '../assets/images/man.png'
import woman_avatar from '../assets/images/woman.png'
import other_avatar from '../assets/images/other.png'

const ContactList = ({ data, editContact, deleteableDataHandler, contactInfoPopup }) => {

  const { getContactData } = useContactsContext();
  const [toggle, setToggle] = useState(false);

  document.body.addEventListener("click", (e) => {
    setToggle(false)
  });
  const actionButtonHandler = (e) => {
    e.stopPropagation();    
    // e.nativeEvent.stopImmediatePropagation();
    setToggle(!toggle)
  }


  return (
    <div className={toggle ? "contact_list_container actions_activated" : "contact_list_container"}>
      <div className="details">
        <div className="user_avatar">
          {/* <i className="fa-solid fa-user"></i> */}
          {
            data.gender === "Male" ? <img src={man_avatar} alt="" /> : data.gender === "Female" ? <img src={woman_avatar} alt="" /> : <img src={other_avatar} alt="" />
          }
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
      <div className={toggle ? "more_info_actions actions_activated" : "more_info_actions"}>
        <ul className={toggle ? "action_buttons _3x active" : "action_buttons _3x"}>
          <li id={data.contactId} className="info" onClick={ e => contactInfoPopup(data)}>
            <i className="fa-solid fa-info-circle pe-none"></i>
          </li>
          <li id={data.contactId} className="delete" onClick={ e => deleteableDataHandler(data)}>
            <i className="fa-solid fa-trash-alt pe-none"></i>
          </li>
          <li id={ data.contactId } className="edit" onClick={ e => {
            editContact(data.contactId)
            getContactData(data.contactId)
          }}>
            <i className="fa-solid fa-pencil-alt pe-none"></i>
          </li>
        </ul>
        <div className={toggle ? "more_info_button active" : "more_info_button"} onClick={ actionButtonHandler }>
          <i className="fa-solid fa-ellipsis-v pe-none"></i>
        </div>
      </div>
    </div>
  );
}

export default ContactList;
