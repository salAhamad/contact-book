import React, { useEffect, useState } from 'react';
import { useContactsContext } from '../contexts/ContactContext';
import moment from 'moment';

const CreateNew = ({ closePopup }) => {

  const { addNewContact } = useContactsContext();
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const initialFields = {
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    phone: '',
    gender: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pinCode: '',
    companyName: '',
    jobTitle: '',
    department: '',
    createAt: '',
  }  

  const [formValue, setFormValue] = useState(initialFields);
  const [formError, setFormError] = useState({})
  const [error, setError] = useState(false)

  const inputHandler = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setFormValue({ ...formValue, [name]: value })
  }
  const currentDate = moment(new Date).format('dddd MMMM Do YYYY, hh:mm:ss');;

  const formSubmit = (e) => {
    e.preventDefault();
    setFormError(formValidation(formValue))    
    setError(true)
    
    setFormValue({ ...formValue, createAt: currentDate })
    if (Object.keys(formError).length === 0 && error) {
      addNewContact(formValue)    
    }
    if (error) {
      
    }
    
  }

  const formValidation = (value) => {
    const errors = {};
    if (!value.firstName) {
      errors.firstName = "First name is required";
    }
    if (!value.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!value.gender) {
      errors.gender = "Gender must be selected";
    }
    if (!value.mobile) {
      errors.mobile = "Mobile number is required";
    }
    // else if (value.mobile.length <= 10) {
    //   errors.mobile = "Mobile number's length must be 10";
    // } else if (value.mobile.length >= 10) {
    //   errors.mobile = "Mobile number cannot be more than 10";
    // }
    if (!value.email) {
      errors.email = "Email address is required";
    } else if (!regex.test(value.email)) {
      errors.email = "This email is not a valid format";
    }
    return errors;
  }

  useEffect(() => {
    if (Object.keys(formError).length === 0 && error) {}
  }, [formValue]);

  return (
    <section className='create_new_section'>
      <div className="sub_container">
        <h4 className='fw-bold text-primary'>
          <i className="fa-solid fa-address-book me-3"></i>
          Create New Contact
        </h4>
        <hr />
        <form action="" className='mt-4 d-flex flex-column gap-3' onSubmit={formSubmit}>
          <div className="form-group d-flex gap-3">
            <label htmlFor='' className="label_icon">
              <i className="fa-solid fa-user"></i>
            </label>
            <div className="d-flex flex-wrap gap-3 w-100">
              <div style={{ width: 'calc(50% - .5rem)' }}>
                <input 
                  onInput={inputHandler} 
                  name='firstName' 
                  value={formValue.firstName} 
                  type="text" 
                  className={!formValue.firstName && error ? "form-control is-invalid" : "form-control" }
                  placeholder="First Name" />
                { formError.firstName && <p className='text-danger'>{formError.firstName}</p>}
              </div>
              <div style={{ width: 'calc(50% - .5rem)' }}>
                <input 
                  onInput={inputHandler} 
                  name='lastName' 
                  value={formValue.lastName} 
                  type="text" 
                  className={!formValue.lastName && error ? "form-control is-invalid" : "form-control" }
                  placeholder="Last Name" />
                { formError.lastName && <p className='text-danger'>{formError.lastName}</p>}
              </div>

            </div>
          </div>
          <div className="form-group d-flex gap-3">
            <label htmlFor='' className="label_icon">
              <i className="fa-solid fa-phone"></i>
            </label>
            <div className="d-flex flex-wrap gap-3 w-100">
              <div style={{ width: 'calc(50% - .5rem)' }}>
                <input 
                  onInput={inputHandler} 
                  name='mobile' 
                  value={formValue.mobile} 
                  type="number" 
                  className={!formValue.mobile && error ? "form-control is-invalid" : "form-control" }
                  placeholder="Mobile number" />
                  { formError.mobile && <p className='text-danger'>{formError.mobile}</p>}
              </div>
              <div style={{ width: 'calc(50% - .5rem)' }}>
                <input 
                  onInput={inputHandler} 
                  name='phone' 
                  value={formValue.phone} 
                  type="number" 
                  className="form-control"
                  placeholder="Phone number" />
              </div>
            </div>
          </div>
          <div className="form-group d-flex gap-3">
            <label htmlFor='' className="label_icon">
              <i className="fa-solid fa-envelope"></i>
            </label>
            <div className="d-flex w-100 flex-column">
              <input
                onInput={inputHandler}
                name="email"
                value={formValue.email}
                type="email"
                className={!formValue.email && error ? "form-control is-invalid" : "form-control"}
                placeholder="Email Id" />
                { formError.email && <p className='text-danger'>{formError.email}</p>}
            </div>
          </div>
          <div className="form-group d-flex gap-3">
            <label htmlFor='' className="label_icon">
              <i className="fa-solid fa-venus-mars"></i>
            </label>
            <div className="d-flex w-100 flex-column">
              <div className='d-flex border w-100 rounded py-2 px-3 gap-5'>
                <div className="form-check">
                  <input onInput={inputHandler} value="Male" className="form-check-input" type="radio" name="gender" id="male" />
                  <label className="form-check-label cursor-pointer" htmlFor="male">Male</label>
                </div>
                <div className="form-check">
                  <input onInput={inputHandler} value="Female" className="form-check-input" type="radio" name="gender" id="female" />
                  <label className="form-check-label cursor-pointer" htmlFor="female">Female</label>
                </div>
                <div className="form-check">
                  <input onInput={inputHandler} value="Other" className="form-check-input" type="radio" name="gender" id="other" />
                  <label className="form-check-label cursor-pointer" htmlFor="other">Other</label>
                </div>
              </div>
              {formError.gender && <p className='text-danger'>{formError.gender}</p>}
            </div>
          </div>

          <div className="group d-flex flex-column gap-3">
            <div className='d-flex mt-3 ps-5 text-secondary'>
              <span className='fw-normal fs-6 ps-2'>Address (Optional)</span>
            </div>
            <div className="form-group d-flex gap-3">
              <label htmlFor='' className="label_icon">
                <i className="fa-solid fa-map-marker-alt"></i>
              </label>
              <div className="d-flex flex-wrap gap-3 w-100">
                <input onInput={inputHandler} name="address" value={formValue.address} type="text" className="form-control"  placeholder="Flat/House/Street/Landmark ..." />
                <div style={{ width: 'calc(50% - .5rem)' }}>
                  <select onInput={inputHandler} className="form-select" name='country' value={formValue.country}>
                    <option defaultValue>Select Country</option>
                    <option value="1">Country Name</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div style={{ width: 'calc(50% - .5rem)' }}>
                  <select onInput={inputHandler} className="form-select" name='state' value={formValue.state}>
                    <option defaultValue>Select State</option>
                    <option value="1">Country Name</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div style={{ width: 'calc(50% - .5rem)' }}>
                  <select onInput={inputHandler} className="form-select" name='city' value={formValue.city}>
                    <option defaultValue>Select City</option>
                    <option value="1">Country Name</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <input name='pincode' value={formValue.pincode} onInput={inputHandler} type="number" className="form-control" style={{ width: 'calc(50% - .5rem)' }} placeholder="Pin Code" />
              </div>
            </div>
          </div>
          
          <div className="group d-flex flex-column gap-3">
            <div className='d-flex mt-3 ps-5 text-secondary'>
              <span className='fw-normal fs-6 ps-2'>Company Details (Optional)</span>
            </div>
            <div className="form-group d-flex gap-3">
              <label htmlFor='' className="label_icon">
                <i className="fa-solid fa-building"></i>
              </label>
              <div className="d-flex flex-wrap gap-3 w-100">
                <input onInput={inputHandler} value={formValue.company} name="company" type="text" className="form-control" style={{ width: 'calc(100% - .0rem)'}} placeholder="Company Name" />
                <input onInput={inputHandler} value={formValue.jobTitle} name="jobTitle" type="text" className="form-control" style={{ width: 'calc(50% - .5rem)' }} placeholder="Job Title" />
                <input onInput={inputHandler} value={formValue.department} name="department" type="text" className="form-control" style={{ width: 'calc(50% - .5rem)' }} placeholder="Department" />
              </div>
            </div>            
          </div>
          <div className="buttons d-flex gap-3 justify-content-center mt-4">
            <button className='btn btn-secondary px-3' type='submit' onClick={closePopup}>Cancel</button>
            <button className='btn btn-primary px-3' type='submit'>Create New</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateNew;
