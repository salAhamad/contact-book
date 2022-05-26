import React, { useEffect, useState } from 'react';
import { useContactsContext } from '../contexts/ContactContext';
import ContactList from './ContactList';
import SearchContact from './SearchContact';

import UpdateContact from '../components/UpdateContact';
import Modal from './Modal';
import ContactProfile from './ContactProfile';

const Contacts = () => {
  const { contacts, deleteContact } =  useContactsContext();
  
  const [editContactToggle, setEditContact] = useState(false);
  const [delContactDetail, setDelContactDetail] = useState([])
  const [modalToggle, setModalToggle] = useState(false)
  const [contactProfile, setContactProfile] = useState(true)
  
  const closePopup = e => {
    e.preventDefault();
    setEditContact(false)
    setContactProfile(false)
  }
  const editContact = (e) => setEditContact(true);
  const deleteableDataHandler = (data) => {
    setModalToggle(true)
    setDelContactDetail(data)
  };
    
  const deleteHandler = (value) => {
    if(!value) {
      setModalToggle(false)
      return
    }
    setModalToggle(false)
    deleteContact(delContactDetail.contactId)
  };


  // useEffect(() => {
  //   modaleHander();
  // }, [modalValue])

  return (
    <>
      <div className='contacts_container'>
        <SearchContact />
        {
          contacts.map((contact, index) => {
            return <ContactList key={index} data={contact} editContact={editContact} deleteableDataHandler={ deleteableDataHandler } />
          })
        }
        {/* Update Contact Popup */}
        { editContactToggle && <UpdateContact closePopup={closePopup} /> }

        {/* Alert Modal */}
        {
          modalToggle && <Modal 
            modaleHandler={deleteHandler}
            modalHeader={'Deleting Contact'} 
            modalType={"danger"} 
            modalMessage={
              <p className='fs-6'>
                Are you sure you want to delete <br />
                <strong>${delContactDetail.firstName} ${delContactDetail.lastName}'s</strong> <br /> 
                contact details?
              </p>
            } /> 
        }

        {
          contactProfile && <ContactProfile data={contactProfile} closePopup={closePopup} />
        }
      </div>
    </>
  );
}

export default Contacts;
