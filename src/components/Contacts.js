import React, { useState } from 'react';
import { useContactsContext } from '../contexts/ContactContext';
import ContactList from './ContactList';
import SearchContact from './SearchContact';

import UpdateContact from '../components/UpdateContact';
import Modal from './Modal';
import ContactProfile from './ContactProfile';

const Contacts = () => {
  const { contacts, searchTerm, searchResults, deleteContact } =  useContactsContext();
  
  const [editContactToggle, setEditContact] = useState(false);
  const [delContactDetail, setDelContactDetail] = useState([])
  const [modalToggle, setModalToggle] = useState(false)
  const [contactProfileToggle, setContactProfileToggle] = useState(false)
  const [contactProfileData, setContactProfileData] = useState({})
  
  const closePopup = e => {
    e.preventDefault();
    setEditContact(false)
    setContactProfileToggle(false)
  }
  const contactInfoPopup = (e) => {
    setContactProfileToggle(true)
    setContactProfileData(e)
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
  
  const contactData = searchTerm.length < 1 ? contacts : searchResults;

  return (
    <>
      <div className='contacts_container'>
        <SearchContact />
        {
          contactData.map((contact, index) => {
            return <ContactList 
              key={index} 
              data={ contact } 
              editContact={editContact}
              deleteableDataHandler={ deleteableDataHandler } 
              contactInfoPopup={contactInfoPopup}    
            />
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
                Are you sure you want to delete <strong>{delContactDetail.firstName} {delContactDetail.lastName}'s</strong> contact details?
              </p>
            } /> 
        }

        {
          contactProfileToggle && 
            <ContactProfile 
            data={contactProfileData} 
            closePopup={closePopup} 
            editContact={editContact}
          />
        }
      </div>
    </>
  );
}

export default Contacts;
