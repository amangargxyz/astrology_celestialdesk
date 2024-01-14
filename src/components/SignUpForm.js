import React, {useReducer, useState} from 'react'
import '../css/mySignup.css'
import AuthService from '../services/auth.service'
import { isEmail } from "validator";
import 'react-clock/dist/Clock.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import SignupFormStep1 from './SignupFormStep1'
import SignupFormStep2 from './SignupFormStep2'
import SignupFormStep3 from './SignupFormStep3'

const initialState = {
    firstName : '',
    lastName : '',
    gender : '',
    email : '',
    mobile : '',
    username : '',
    password : '',
    dob : '',
    birthTime : '12:00',
    birthPlace : '',
    state : '',
    city : '',
    qualification : '',
    experience : '',
    astrologerService : '',
    fee : '',
    isAstrologer : false,
    isAdmin : false,
    isApproved : true,
    isMobileVerified: false,
    isEmailVerified: false,
    role : []
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'update_firstName' :
            return {...state, firstName : action.value}
        case 'update_lastName' :
            return {...state, lastName : action.value}
        case 'update_gender':
            return { ...state, gender: action.value }
        case 'update_email' :
            return {...state, email : action.value}
        case 'update_mobile' :
            return {...state, mobile : action.value}
        case 'update_username' :
            return {...state, username : action.value}
        case 'update_password' :
            return {...state, password : action.value}
        case 'update_dob' :
            return {...state, dob : action.value}
        case 'update_birthTime' :
            return {...state, birthTime : action.value}
        case 'update_birthPlace' :
            return {...state, birthPlace : action.value}
        case 'update_state':
            return { ...state, state: action.value }
        case 'update_city':
            return { ...state, city: action.value }
        case 'update_qualification':
            return { ...state, qualification: action.value }
        case 'update_experience':
            return { ...state, experience: action.value }
        case 'update_astrologerService':
            return { ...state, astrologerService: action.value }
        case 'update_fee' :
            return { ...state, fee: action.value }
        case 'update_isAstrologer' : {
            if(action.value === 'true')
                return {...state, isAstrologer : true, isApproved : false, role : ['astrologer']}
            else
                return {...state, isAstrologer : false, role : ['user']}
        }
        case 'update_isMobileVerified' :
            return {...state, isMobileVerified : action.value}
        case 'update_isEmailVerified' :
            return {...state, isEmailVerified : action.value}
        case 'reset' :
            return initialState
        default :
            return state
    }
}

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert" style={{ width: '200px' }}>
                This field is required!
            </div>
        );
    }
};

function SignUpForm() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [successful, setSuccessful] = useState(false)
    const [message, setMessage] = useState("")
    const [dobMessage, setDobMessage] = useState("")
    const [birthTimeMessage, setBirthTimeMessage] = useState("")
    const [stateMessage, setStateMessage] = useState("")
    const [cityMessage, setCityMessage] = useState("")
    const [step, setStep] = useState(1)
    const [isDisclaimerAccepted, setIsDisclaimerAccepted] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(state)
        console.log(dobMessage)
        console.log(birthTimeMessage)

        setMessage("")
        setSuccessful(false)

        if(!state.dob) {
            setDobMessage('Please select a date')
        } 
        if(!state.birthTime) {
            setBirthTimeMessage('Please select a time')
        }
        if(!state.state) {
            setStateMessage('Please select a state')
        }
        if(!state.city) {
            setCityMessage('Please select a city')
        }
        if(state.dob && state.birthTime && state.state && state.city && isDisclaimerAccepted) {
            if (0 === 0) {
                AuthService.register(state).then(
                    (response) => {
                        setMessage(response.data.message)
                        setSuccessful(true)
                    },
                    (error) => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString()
    
                        setMessage(resMessage)
                        setSuccessful(false)
                    }
                )
            }
            setDobMessage('')
            setBirthTimeMessage('')
        }
    }

    const changeHandler = (e) => {
        dispatch({type : `update_${e.target.name}`, value : e.target.value})
    }

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div>
            {(step === 1) && (
                <SignupFormStep1 
                    nextStep={nextStep} 
                    changeHandler={changeHandler} 
                />
            )}
            {(step === 2) && (
                <SignupFormStep2 
                    state={state} 
                    dispatch={dispatch} 
                    nextStep={nextStep} 
                    prevStep={prevStep} 
                    changeHandler={changeHandler} 
                    required={required} 
                />
            )}
            {(step === 3) && (
                <SignupFormStep3 
                    state={state} 
                    dispatch={dispatch} 
                    prevStep={prevStep} 
                    submitForm={submitHandler} 
                    changeHandler={changeHandler} 
                    required={required} 
                    dobMessage={dobMessage} 
                    birthTimeMessage={birthTimeMessage}
                    stateMessage={stateMessage}
                    cityMessage={cityMessage} 
                    message={message}
                    successful={successful}
                    isDisclaimerAccepted={isDisclaimerAccepted}
                    setIsDisclaimerAccepted={setIsDisclaimerAccepted}
                />
            )}
        </div>
    )
}

export default SignUpForm
