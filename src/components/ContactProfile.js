import React, { useState } from 'react'

import man_avatar from '../assets/images/man.png'
import woman_avatar from '../assets/images/woman.png'
import other_avatar from '../assets/images/other.png'

function ContactProfile({ data, closePopup }) {
  const [toggle, setToggle] = useState(true);
  const actionButtonHandler = (e) => {
    e.stopPropagation();    
    // e.nativeEvent.stopImmediatePropagation();
    setToggle(!toggle)
  }
  return (
    <section className='contact_profile_overlay'>
        <div className="contact_profile_container">
            <div className="contact_profile_sub_container">
                <div className={toggle ? "more_info_actions actions_activated" : "more_info_actions"}>
                    <ul className={toggle ? "action_buttons active" : "action_buttons"}>
                        <li id={data.contactId} className="info">
                            <i className="fa-solid fa-info-circle pe-none"></i>
                        </li>
                        <li id={data.contactId} className="delete">
                            <i className="fa-solid fa-trash-alt pe-none"></i>
                        </li>
                        <li id={ data.contactId } className="edit">
                            <i className="fa-solid fa-pencil-alt pe-none"></i>
                        </li>
                    </ul>
                    <div className={toggle ? "more_info_button active" : "more_info_button"} onClick={ actionButtonHandler }>
                        <i className="fa-solid fa-ellipsis-v pe-none"></i>
                    </div>
                    <div className="more_info_button closePopup" onCanPlay={e => closePopup(e)}>
                        <i className="fa-solid fa-times pe-none"></i>
                    </div>
                </div>
                <div className="short_info_container d-flex align-items-start">
                    <div className="profile_image">
                        <img src={man_avatar} alt="" />
                    </div>
                    <div className="info_container">
                        <h4>User Name</h4>
                        <ul>
                            <li>
                                <i className="fa-solid fa-phone"></i>
                                <a href="tel:+971556581172">+971556581172</a>
                            </li>
                            <li>
                                <i className="fa-solid fa-envelope"></i>
                                <a href="mailto:user@gmail.com">user@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ContactProfile