import React, { useReducer, useState } from 'react'
import '../css/myLogin.css'
import { useNavigate } from "react-router-dom"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import AuthService from '../services/auth.service'

const initialState = {
    username: '',
    password: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'update_username':
            return { ...state, username: action.value }
        case 'update_password':
            return { ...state, password: action.value }
        case 'reset':
            return initialState
        default:
            return state
    }
}

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert" style={{ width: '200px' }}>
                This field is required!
            </div>
        )
    }
}

function LoginForm() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [iconStyle, setIconStyle] = useState({
        float: 'right',
        color: 'white',
        padding: '10px',
        cursor: 'pointer'
    })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    // const formRef = useRef()
    // const checkBtnRef = useRef()
    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(state)

        setMessage("")
        setLoading(true)

        // formRef.current.validateAll()

        //checkBtnRef.current.context._errors.length === x
        if (0 === 0) {
            AuthService.login(state).then(
                (response) => {
                    console.log(response)
                    navigate("/mainpage", response)
                    // window.location.reload()
                },
                (error) => {
                    console.log(error)
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()

                    setLoading(false)
                    setMessage(resMessage)
                }
            )
        } else {
            setLoading(false)
        }
    }

    const changeHandler = (e) => {
        dispatch({ type: `update_${e.target.name}`, value: e.target.value })
    }

    const onMouseOver = () => {
        setIconStyle({ ...iconStyle, color: 'black' })
    }

    const onMouseOut = () => {
        setIconStyle({ ...iconStyle, color: 'white' })
    }

    const resetCreds = () => {
        dispatch({ type: 'reset' })
    }

    const signupRedirect = () => {
        navigate('/signup')
    }

    return (
        <div>
            <div><br />
                <h1 className={'headings'}>Welcome to CelestialDesk.com</h1><br />
                <div className={'containerLogin'}>
                    <i className="fa fa-close icon" style={iconStyle}
                        onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={resetCreds}></i><br />
                    {/* <h2 className={'headings'}>LOGIN</h2> */}
                    <Form name="loginform" className={'primary1'} onSubmit={submitHandler}>
                        <div className={'rowlogin'}>
                            <div className={'columnlogin'}>
                                <i className="fa fa-user icon"></i>
                                <Input type="text"
                                    id="username"
                                    name="username"
                                    value={state.username}
                                    onChange={changeHandler}
                                    placeholder="Username"
                                    validations={[required]}
                                />
                            </div>
                        </div>
                        <div className={'rowlogin'}>
                            <div className={'columnlogin'}>
                                <i className="fa fa-key icon"></i>
                                <Input type={showPassword ? "text" : "password"}
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
                                    left: '45px',
                                    color: 'white'
                                }}>Show Password</label>
                                <Input type="checkbox" onChange={togglePasswordVisibility} style={{
                                    position: 'relative',
                                    left: '-20px',
                                    top: '-20px'
                                }} />
                            </div>
                        </div>
                        <br />
                        <div className={'rowlogin'}>
                            <Input type="submit" disabled={loading} value="LOGIN" />
                        </div><br />
                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{ display: "none" }} />
                        <button className={'newAccount'} onClick={signupRedirect}>Create new account</button><br/><br/>
                        <p className={'pass'} >Forgot Password?</p>
                        <p className={'pass'} >Forgot Username?</p>
                        {/* <p className={'pass'} onClick={signupRedirect}>New user Signup</p><br /> */}
                    </Form>
                </div><br /><br />
            </div><br></br>
        </div>
    )
}

export default LoginForm
