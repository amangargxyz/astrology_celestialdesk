import React, { useState } from 'react'
import '../css/mySignup.css'
import MobileVerifyTest from './MobileVerifyTest'
import UserService from '../services/user.service'
import { Link } from 'react-router-dom'
import { isEmail } from "validator";

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert" style={{ width: '250px' }}>
                This is not a valid email.
            </div>
        )
    }
}

function SignupFormStep2({ state, dispatch, nextStep, prevStep, changeHandler, required }) {
    const [usernameExists, setUsernameExists] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const isUsernameExists = async (newUsername) => {
        if(newUsername) {
            try {
                UserService.isUsernameExist(newUsername).then(
                    (response) => {
                        if(response.data) {
                            setUsernameExists('Username already exists.')
                        } else {
                            setUsernameExists('Username is available.')
                        }
                    }
                )
            } catch (error) {
                console.error('Error checking username:', error)
                setUsernameExists('Error checking username.')
            }
        } else {
            setUsernameExists('')
        }
    }

    const changeUsernameHandler = async (e) => {
        const newUsername = e.target.value
        dispatch({type : 'update_username', value : newUsername})
        isUsernameExists(newUsername)
    }

    // const changeHandler = (e) => {
    //     updateData({type : `update_${e.target.name}`, value : e.target.value})
    // }

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
                                            }} onClick={prevStep} ></i>Signup</h2><br />
                    <div className={'rowsignup'}>
                        <div className={'columnsignup'}>
                            <label>First Name</label>
                            <i className="fa fa-user icon"></i>
                            <input type="text"
                                id="firstName"
                                name="firstName"
                                value={state.firstName}
                                onChange={changeHandler}
                                placeholder="First Name"
                                validations={[required]}
                            />
                        </div>
                    </div>
                    <div className={'rowsignup'}>
                        <div className={'columnsignup'}>
                            <label>Last Name</label>
                            <i className="fa fa-user icon"></i>
                            <input type="text"
                                id="lastName"
                                name="lastName"
                                value={state.lastName}
                                onChange={changeHandler}
                                placeholder="Last Name"
                                validations={[required]}
                            />
                        </div>
                    </div>
                    <div className={'rowsignup'}>
                        <div className={'columnsignup'}>
                            <label style={{
                                        position: 'relative',
                                        left: '-25px',
                                        width: '200px'
                            }}>Gender</label><br/>
                            <label htmlFor="yes" style={{ marginLeft: '15px' }}>Male</label>
                            <input type="radio"
                                id="male"
                                name="gender"
                                value={'male'}
                                onChange={changeHandler}
                            /><br />
                            <label htmlFor="no" style={{ marginLeft: '15px' }}>Female</label>
                            <input type="radio"
                                id="female"
                                name="gender"
                                value={'female'}
                                onChange={changeHandler}
                            />
                        </div>
                    </div>
                    <div className={'rowsignup'}>
                        <div className={'columnsignup'}>
                            <label>Username</label>
                            <i className="fa fa-user icon"></i>
                            <input type="text"
                                id="username"
                                name="username"
                                value={state.username}
                                onChange={changeUsernameHandler}
                                placeholder="Username"
                                validations={[required]}
                            />
                            <p style={{ color: 'white', width: '200px' }}>{usernameExists}</p>
                        </div>
                    </div>
                    <div className={'rowsignup'}>
                        <div className={'columnsignup'}>
                            <label>Password</label>
                            <i className="fa fa-unlock-alt icon"></i>
                            <input type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={state.password}
                                onChange={changeHandler}
                                placeholder="Password"
                                validations={[required]}
                            />
                            <label style={{
                                position: 'relative',
                                bottom: '-3px',
                                left: '50px',
                                color: 'white',
                                fontSize: '15px'
                            }}>Show Password</label>
                            <input type="checkbox" onChange={togglePasswordVisibility} style={{
                                position: 'relative',
                                left: '-70px',
                                top: '5px'
                            }} />
                        </div>
                    </div>
                    <div className={'rowsignup'}>
                        <div className={'columnsignup'}>
                            <label>Email</label>
                            <i className="fa fa-envelope icon"></i>
                            <input type="text"
                                id="email"
                                name="email"
                                value={state.email}
                                onChange={changeHandler}
                                placeholder="Email"
                                // validations={[required, validEmail]}
                            />
                        </div>
                    </div>
                    <div className={'rowsignup'}>
                        <div className={'columnsignup'}>
                            <label>Mobile</label>
                            <i className="fa fa-mobile icon"></i>
                            <input type="text"
                                id="mobile"
                                name="mobile"
                                value={state.mobile}
                                onChange={changeHandler}
                                placeholder="Ex. 9999999999"
                                // validations={[required]}
                            />
                            {/* <MobileVerifyTest
                                mobile={state.mobile}
                                dispatch={dispatch}
                            // userDispatch={dispatch}
                            // required={required}
                            /> */}
                        </div>
                    </div><br/>
                    {/* <button className={'rowsignup'} onClick={prevStep}>Back</button> */}
                    <button className={'rowsignup'} onClick={nextStep}>Next</button><br/><br/>
                    {/* <Link className='loginPage' to={"/"}>
                        Go to Login Page
                    </Link><br/><br/> */}
                </div><br /><br />
            </div><br></br>
        </div>
    )
}

export default SignupFormStep2
