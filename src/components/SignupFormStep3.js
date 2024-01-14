import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import ClockTimePicker from './ClockTimePicker';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../css/myDisclaimer.css'
import indianstates from '../util/indianstates.json'

function SignupFormStep3({ state, dispatch, prevStep, submitForm, changeHandler, required, dobMessage, birthTimeMessage,
    stateMessage, cityMessage, message, successful, isDisclaimerAccepted, setIsDisclaimerAccepted }) {
    const [qualificationOther, setQualificationOther] = useState('')
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [otherCityValue, setOtherCityValue] = useState('');

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        setSelectedCity('');
        dispatch({ type: 'update_state', value: event.target.value })
        dispatch({ type: 'update_city', value: '' })
    };

    const handleCityChange = (event) => {
        const { value } = event.target
        setSelectedCity(value);
        if (value !== 'Other') {
            setOtherCityValue('');
            dispatch({ type: 'update_city', value: value })
        } else {
            dispatch({ type: 'update_city', value: '' })
        }
    };

    const handleOtherCityInputChange = (event) => {
        const { value } = event.target;
        setOtherCityValue(value);
        dispatch({ type: 'update_city', value: value })
    };

    const states = Object.keys(indianstates);

    const changeDobHandler = (date) => {
        dispatch({ type: 'update_dob', value: date })
    }

    const changeBirthTimeHandler = (time) => {
        dispatch({ type: 'update_birthTime', value: time })
    }

    const changeQualificationHandler = (e) => {
        const value = e.target.value
        setQualificationOther(value)
        dispatch({ type: 'update_qualification', value: value })
    }

    return (
        <div>
            <div><br />
                <h1 className={'headings'}>Welcome to CelestialDesk.com</h1><br />
                <div className={'containerSignup'}><br />
                    {/* <i className="fa fa-close icon" style={iconStyle}
                        onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={resetCreds}></i><br /> */}
                    <h2 className={'headings'}><i className="fa fa-arrow-left icon" style={{
                        position: 'relative',
                        left: '-150px',
                        cursor: 'pointer'
                    }} onClick={prevStep} ></i>Signup</h2>
                    {!message ? (
                        <div>
                            <div className={'rowsignup'}>
                                <div className={'columnsignup'}>
                                    <label>Date of Birth</label>
                                    <i className="fa fa-calendar icon" style={{ zIndex: 1 }} />
                                    <DatePicker
                                        selected={state.dob}
                                        onChange={changeDobHandler}
                                        dateFormat="dd-MM-yyyy"
                                        placeholderText="Select a date"
                                        showMonthDropdown
                                        showYearDropdown
                                        yearDropdownItemNumber={100}
                                        scrollableYearDropdown
                                    />
                                    {dobMessage && (
                                        <div className="alert alert-danger" role="alert" style={{ width: '200px' }}>
                                            {dobMessage}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={'rowsignup'}>
                                <div className={'columnsignup'}>
                                    <label>Birth Time</label>
                                    <i className="fa fa-clock-o icon" />
                                    <ClockTimePicker onChange={changeBirthTimeHandler} selectedTime={state.birthTime} />
                                    {birthTimeMessage && (
                                        <div className="alert alert-danger" role="alert" style={{ width: '200px' }}>
                                            {birthTimeMessage}
                                        </div>
                                    )}
                                </div>
                            </div><br />
                            <div className={'rowsignup'}>
                                {/* <div className={'columnsignup'}>
                                    <label>Birth Place</label>
                                    <i className="fa fa-map-marker icon"></i>
                                    <input type="text"
                                        id="birthPlace"
                                        name="birthPlace"
                                        value={state.birthPlace}
                                        onChange={changeHandler}
                                        placeholder="Birth Place"
                                        validations={[required]}
                                    />
                                </div> */}
                                <div className={'columnsignup'}>
                                    <label className='statelabel'>Select State:</label>
                                    <select className='stateselect' id="stateSelect" value={selectedState} onChange={handleStateChange}>
                                        <option value="">Select</option>
                                        {states.map((state, index) => (
                                            <option key={index} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                    {stateMessage && (
                                        <div className="alert alert-danger" role="alert" style={{ width: '200px' }}>
                                            {stateMessage}
                                        </div>
                                    )}
                                </div>
                                {selectedState && (
                                    <div className={'columnsignup'}>
                                        <label className='statelabel'>Select City:</label>
                                        <select className='stateselect' id="citySelect" value={selectedCity} onChange={handleCityChange}>
                                            <option value="">Select</option>
                                            {indianstates[selectedState].map((city, index) => (
                                                <option key={index} value={city}>
                                                    {city}
                                                </option>
                                            ))}
                                        </select>
                                        {cityMessage && (
                                            <div className="alert alert-danger" role="alert" style={{ width: '200px' }}>
                                                {cityMessage}
                                            </div>
                                        )}
                                        {selectedCity === 'Other' && (
                                            <div>
                                                <i className="fa fa-map-marker icon"></i>
                                                <input
                                                    type="text"
                                                    value={otherCityValue}
                                                    onChange={handleOtherCityInputChange}
                                                    placeholder="Enter your City/District"
                                                    validations={[required]}
                                                />
                                                {cityMessage && (
                                                    <div className="alert alert-danger" role="alert" style={{ width: '200px' }}>
                                                        {cityMessage}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <p style={{ width: '500px', color: 'white', fontStyle: 'italic' }}>
                                        <i className="fa fa-info-circle icon"
                                            style={{ position: 'relative', left: '0px', top: '0px' }}
                                        />Select 'Other' option if your city name is not available in the list.</p>
                                    </div>
                                )}
                            </div>
                            {state.isAstrologer && (
                                <div>
                                    <div className={'rowsignup'}>
                                        <div className={'columnsignup'}>
                                            <label style={{
                                                position: 'relative',
                                                left: '35px'
                                            }}>Qualification</label><br />
                                            <select
                                                name="qualification"
                                                value={qualificationOther}
                                                onChange={changeQualificationHandler}
                                                style={{
                                                    position: 'relative',
                                                    left: '30px',
                                                    top: '5px',
                                                    width: '438px',
                                                    height: '50px'
                                                }}
                                            >
                                                <option value="">-- Select an option --</option>
                                                <option value="selfLearnt">Self Learnt</option>
                                                <option value="certificate">Certificate</option>
                                                <option value="diploma">Diploma</option>
                                                <option value="degree">Degree</option>
                                                <option value="other">Other</option>
                                            </select>
                                            {(qualificationOther === 'other') && (
                                                <div>
                                                    <i className="fa fa-graduation-cap icon"></i>
                                                    <input type="text"
                                                        id="qualification"
                                                        name="qualification"
                                                        value={state.qualification}
                                                        onChange={changeHandler}
                                                        placeholder="Qualification"
                                                        validations={[required]}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className={'rowsignup'}>
                                        <div className={'columnsignup'}>
                                            <label>Experience</label>
                                            <i className="fa fa-graduation-cap icon"></i>
                                            <input type="text"
                                                id="experience"
                                                name="experience"
                                                value={state.experience}
                                                onChange={changeHandler}
                                                placeholder="Experience"
                                                validations={[required]}
                                            />
                                        </div>
                                    </div>
                                    <div className={'rowsignup'}>
                                        <div className={'columnsignup'}>
                                            <label style={{
                                                position: 'relative',
                                                left: '15px',
                                                width: '250px'
                                            }}>Will you provide service for</label><br />
                                            <label htmlFor="free" style={{ marginLeft: '15px' }}>Free</label>
                                            <input type="radio"
                                                id="free"
                                                name="astrologerService"
                                                value={'FREE'}
                                                onChange={changeHandler}
                                            /><br />
                                            <label htmlFor="paid" style={{ marginLeft: '15px' }}>Paid</label>
                                            <input type="radio"
                                                id="paid"
                                                name="astrologerService"
                                                value={'PAID'}
                                                onChange={changeHandler}
                                            />
                                        </div>
                                    </div>
                                    {(state.astrologerService === 'PAID') && (
                                        <div className={'rowsignup'}>
                                            <div className={'columnsignup'}>
                                                <label>Fee</label>
                                                <i className="fa fa-money icon"></i>
                                                <input type="text"
                                                    id="fee"
                                                    name="fee"
                                                    value={state.fee}
                                                    onChange={changeHandler}
                                                    placeholder="Fee per query"
                                                    validations={[required]}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}<br />
                            <Popup
                                trigger={<input type="submit" value="Signup" />}
                                modal
                                nested
                            >
                                {close => (
                                    <div className="modal1">
                                        <button className="close" onClick={close}>
                                            &times;
                                        </button>
                                        <div className="header"> Disclaimer </div>
                                        <div className="content">
                                            {' '}
                                            <label style={{
                                                position: 'relative',
                                                bottom: '0px',
                                                left: '20px',
                                                color: 'black',
                                                fontSize: '15px',
                                                width: '700px',
                                                textAlign: 'justify'
                                            }}>This website shows, provides and contains information for general purpopses only. Any fact or information can't be use for legal purpose. Though we endeavor to keep the information up to date and correct, we make no warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability ,correctness of the information, products, services provided by this platform. Any action you take on the basis of information/service provided on this platform must be strictly at your own free will and own risk. We advise you to use infromation or service provided on this platform for entertainment purpose only.
                                            </label>
                                            <input type="checkbox" style={{
                                                position: 'relative',
                                                left: '-700px',
                                                top: '-135px'
                                            }} onClick={() => setIsDisclaimerAccepted(!isDisclaimerAccepted)} />
                                        </div>
                                        <div className="actions">
                                            <button
                                                className="button"
                                                onClick={submitForm}
                                            >
                                                Signup
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </Popup><br /><br />
                            {/* <div className={'rowsignup'}>
                                <input type="submit" value="Signup" onClick={toggleDisclaimer} />
                                <Disclaimer isOpen={isDisclaimerOpen} onClose={toggleDisclaimer} />
                            </div><br /> */}
                        </div>
                    ) : (
                        <div>
                            <div
                                className={
                                    successful ? "alert alert-success" : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {message}
                            </div>
                            <Link className='loginPage' to={"/"}>
                                Go to Login Page
                            </Link><br /><br />
                        </div>
                    )}
                    {/* <Link className='loginPage' to={"/"}>
                        Go to Login Page
                    </Link><br /><br /> */}
                </div><br /><br />
            </div><br></br>
        </div>
    )
}

export default SignupFormStep3
