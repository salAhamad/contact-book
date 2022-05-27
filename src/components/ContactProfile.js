import React, { useState } from 'react'

import man_avatar from '../assets/images/man.png'
import woman_avatar from '../assets/images/woman.png'
import other_avatar from '../assets/images/other.png'

function ContactProfile({ data, closePopup }) {
  const [toggle, setToggle] = useState(false);
  return (
    <section className='contact_profile_overlay'>
        <div className="contact_profile_container">
            <div className="contact_profile_sub_container">
                <div className={toggle ? "more_info_actions actions_activated" : "more_info_actions"}>
                    <ul className={toggle ? "action_buttons _2x active" : "action_buttons _2x"}>
                        <li id={data.contactId} className="delete">
                            <i className="fa-solid fa-trash-alt pe-none"></i>
                        </li>
                        <li id={ data.contactId } className="edit">
                            <i className="fa-solid fa-pencil-alt pe-none"></i>
                        </li>
                    </ul>
                    <div className={toggle ? "more_info_button active" : "more_info_button"} onClick={ e => setToggle(!toggle) }>
                        <i className="fa-solid fa-ellipsis-v pe-none"></i>
                    </div>
                    <div className="more_info_button close_popup" onClick={e => closePopup(e)}>
                        <i className="fa-solid fa-times pe-none"></i>
                    </div>
                </div>
                <div className="short_info_container d-flex align-items-center">
                    <div className="profile_image">
                        <img src={man_avatar} alt="" />
                    </div>
                    <div className="info_container">
                        <h4 className="user_name fs-4 fw-bold">User Name</h4>
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
                <div className="details_container mt-4 d-flex flex-column gap-3">
                    <div className="form-group d-flex gap-3">
                        <label htmlFor='' className="label_icon">
                            <i className="fa-solid fa-user"></i>
                        </label>
                        <div className="d-flex flex-wrap gap-3 w-100">
                            <div style={{ width: 'calc(50% - .5rem)' }}>
                                <input name='firstName' value={data.firstName} type="text" className="form-control" placeholder="First Name" />
                            </div>
                            <div style={{ width: 'calc(50% - .5rem)' }}>
                                <input name='lastName' value={data.lastName} type="text" className="form-control" placeholder="Last Name" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group d-flex gap-3">
                        <label htmlFor='' className="label_icon">
                            <i className="fa-solid fa-phone"></i>
                        </label>
                        <div className="d-flex flex-wrap gap-3 w-100">
                            <div style={{ width: 'calc(50% - .5rem)' }}>
                                <input name='mobile' value={data.mobile} type="text" className="form-control" placeholder="Mobile Number" />
                            </div>
                            <div style={{ width: 'calc(50% - .5rem)' }}>
                                <input name='phone' value={data.phone} type="text" className="form-control" placeholder="Phone Number" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group d-flex gap-3">
                        <label htmlFor='' className="label_icon">
                            <i className="fa-solid fa-envelope"></i>
                        </label>
                        <div className="d-flex flex-wrap gap-3 w-100">
                            <input name='email' value={data.mobile} type="email" className="form-control" placeholder="Email Id" />
                        </div>
                    </div>
                    <div className="form-group d-flex gap-3">
                        <label htmlFor='' className="label_icon">
                            <i className="fa-solid fa-venus-mars"></i>
                        </label>
                        <div className="d-flex w-100 flex-column">
                            <div className='d-flex border w-100 rounded py-2 px-3 gap-5'>
                                <div className="form-check">
                                    <input value="Male" className="form-check-input" type="radio" name="gender" id="male" defaultChecked={data.gender === 'Male' ? true : false } />
                                    <label className="form-check-label cursor-pointer" htmlFor="male">Male</label>
                                </div>
                                <div className="form-check">
                                    <input value="Female" className="form-check-input" type="radio" name="gender" id="female" defaultChecked={ data.gender === 'Female' ? true : false } />
                                    <label className="form-check-label cursor-pointer" htmlFor="female">Female</label>
                                </div>
                                <div className="form-check">
                                    <input value="Other" className="form-check-input" type="radio" name="gender" id="other" defaultChecked={ data.gender === 'Other' ? true : false } />
                                    <label className="form-check-label cursor-pointer" htmlFor="other">Other</label>
                                </div>
                            </div>
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
                                <input name="address" value={data.address} type="text" className="form-control"  placeholder="Flat/House/Street/Landmark ..." />
                                <div style={{ width: 'calc(50% - .5rem)' }}>
                                    <input name="address" value={data.country} type="text" className="form-control"  placeholder="Country Name" /> 
                                </div>
                                <div style={{ width: 'calc(50% - .5rem)' }}>
                                    <input name="address" value={data.state} type="text" className="form-control"  placeholder="State Name" /> 
                                </div>
                                <div style={{ width: 'calc(50% - .5rem)' }}>
                                    <input name="address" value={data.city} type="text" className="form-control"  placeholder="City Name" /> 
                                </div>
                                <div style={{ width: 'calc(50% - .5rem)' }}>
                                    <input name="address" value={data.pincode} type="text" className="form-control"  placeholder="Pin Code" /> 
                                </div>
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
                                <input name="companyName" value={data.address} type="text" className="form-control"  placeholder="Company Name" />
                                <div style={{ width: 'calc(50% - .5rem)' }}>
                                    <input name="jobTitle" value={data.country} type="text" className="form-control"  placeholder="Job Title" /> 
                                </div>
                                <div style={{ width: 'calc(50% - .5rem)' }}>
                                    <input name="department" value={data.state} type="text" className="form-control"  placeholder="Department" /> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
  )
}

export default ContactProfile