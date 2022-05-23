import React, { useEffect, useState } from 'react';
import { useContactsContext } from '../contexts/ContactContext';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import axios from 'axios';

const CreateNew = ({ closePopup }) => {

  const COUTNRIES_API_URL = 'http://localhost:3000/coutries';
  const STATES_API_URL = 'http://localhost:3000/states';
  const CITIES_API_URL = 'http://localhost:3000/cities';

  // const NEW_COUNTIES_API_URL = 'https://restcountries.com/v3.1/all'

  const { addNewContact } = useContactsContext();
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const initialFields = {
    contactId: null,
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
    pincode: '',
    company: '',
    jobTitle: '',
    department: '',
    createAt: '',
  }

  const [formValue, setFormValue] = useState(initialFields);
  const [formError, setFormError] = useState({})
  const [error, setError] = useState(false)
  const [country, setCountry] = useState([])
  const [state, setState] = useState([])
  const [cities, setCities] = useState([])
  const [networkError, setNetworkError] = useState(null);
  
  const currentDate = moment(new Date()).format('DD/MM/YYYY, hh:mm:ss');;
  
  // Fetching all counties
  const getAllCountries = async () => {
    try {
      await axios.get(COUTNRIES_API_URL).then(response => {
        setCountry(response.data);
      })
    } catch (error) {
      setNetworkError(error.message)
    }
  }

  // Comnmon Input Hander
  const inputHandler = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setFormValue({ ...formValue, [name]: value })
  }
  
  // Country selection handler to get all states of it.
  const countrySelectionHandler = (e) => {
    const {name, value} = e.target;
    const countryName = country.filter(cntry => cntry.id === parseInt(value)).map(item => item.name);
    setFormValue({ ...formValue, [name]: countryName[0] })
    checkStates(parseInt(e.target.value))
  }
  // Pushing all states to the array
  const checkStates = async (cntryId) => {
    try {
      const result  = await axios(STATES_API_URL).then(res => res.data);
      setState(result.filter(state => state.country_id === cntryId))
    } catch (error) {
      setNetworkError(error.message)
    }
  }

  // State Selection handler to find all cities of it.
  const stateSelectionHandler = async (e) => {
    const {name, value} = e.target;
    const stateName = state.filter(cntry => cntry.id === parseInt(value)).map(item => item.name);
    setFormValue({ ...formValue, [name]: stateName[0] })
    checkCities(parseInt(e.target.value))
  }
  
  // Pushing cities to the array based on the selected state.
  const checkCities = async (sttId) => {
    try {
      const result  = await axios(CITIES_API_URL).then(res => res.data);
      setCities(result.filter(city => city.state_id === sttId))
    } catch (error) {
      setNetworkError(error.message)
    }
  }

  const formSubmit = (e) => {
    e.preventDefault();
    setFormError(formValidation(formValue))    
    setError(true)
    
    setFormValue({ ...formValue, createAt: currentDate })
    setFormValue({ ...formValue, contactId: uuidv4() })
    
    if(Object.keys(formError).length === 0 && error) {
      setError(false)
      closePopup(e)
      addNewContact(formValue)
    } else {
      setError(true)
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

  useEffect(() => {}, [state, cities]);

  useEffect(() => {
    // if (Object.keys(formError).length === 0 && error) {}
    getAllCountries();
  }, []);

  return (
    <section className='create_new_section'>
      <div className="sub_container">
        <div className="form_header d-flex justify-content-between">
          <h4 className='fw-bold text-primary'>
            <i className="fa-solid fa-address-book me-3"></i>
            Create New Contact
          </h4>
          <div className="popupCloseButton" onClick={closePopup}><i className="fa-solid fa-times"></i></div>
        </div>
        <hr />
        <form action="" className='mt-4 d-flex flex-column gap-3' onSubmit={formSubmit}>
          {
            networkError && <div className="alert alert-warning">
            <p className="text-danger mb-1">{networkError}</p>
            <p className='m-0' style={{fontSize: '80%'}}>Make sure your server is running to fetch counties, states, and cities.</p>
          </div>
          }
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
                  <select onChange={countrySelectionHandler} className="form-select" name='country'>
                    <option defaultValue>Select Country</option>
                    {
                      country.map((country, index) => {
                        return <option key={index} value={country.id}>{country.name}</option>
                      })
                    }
                  </select>
                </div>
                <div style={{ width: 'calc(50% - .5rem)' }}>
                  <select onChange={stateSelectionHandler} className="form-select" name='state'>
                    <option defaultValue>Select State</option>
                    {
                      state.length > 0 ? 
                      state.map((state, index) => {
                        return <option value={state.id} key={index}>{state.name}</option>
                      }) :
                      state.map((state, index) => {
                        return <option value="No State" key={index}>Not found any state</option>
                      })
                    }                    
                  </select>
                </div>
                <div style={{ width: 'calc(50% - .5rem)' }}>
                  <select onChange={inputHandler} className="form-select" name='city' value={formValue.city}>
                    <option defaultValue>Select City</option>
                    {
                      state.length > 0 ? 
                      cities.map((city, index) => {
                        return <option value={city.name} key={index}>{city.name}</option>
                      }) :
                      cities.map((city, index) => {
                        return <option value="No City" key={index}>Not found any City</option>
                      })
                    }    
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
            {/* <button className='btn btn-secondary px-3' type='submit' onClick={closePopup}>Cancel</button> */}
            <button className='btn btn-primary px-3' type='submit'>Create New</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateNew;
