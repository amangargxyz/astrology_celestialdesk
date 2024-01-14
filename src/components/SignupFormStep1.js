import React, {useState} from 'react'
import '../css/mySignup.css'
import { Link } from 'react-router-dom'

function SignupFormStep1({ nextStep, changeHandler }) {
    const [iconStyle, setIconStyle] = useState({
        float: 'right',
        color: 'white',
        padding:'10px',
        cursor:'pointer'
    })

    // const onMouseOver = () => {
    //     setIconStyle({...iconStyle, color : 'black'})
    // }

    // const onMouseOut = () => {
    //     setIconStyle({...iconStyle, color : 'white'})
    // }

    // const resetCreds = () => {
    //     updateData({type : 'reset'})
    // }

    // const changeHandler = (e) => {
    //     updateData({type : `update_${e.target.name}`, value : e.target.value})
    // }

    return (
        <div>
            <div><br />
                <h1 className={'headings'}>Welcome to CelestialDesk.com</h1><br />
                <div className={'containerSignup'}><br/>
                    {/* <i className="fa fa-close icon" style={iconStyle} 
		                onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={resetCreds}></i><br/> */}
                    <h2 className={'headings'}>Signup</h2><br/>
                    <div className={'primary1'}>
                        <div>
                            <div className={'rowsignup'}>
                                <div className={'columnsignup'}>
                                    <label style={{
                                        position: 'relative',
                                        left: '15px',
                                        width: '200px'
                                    }}>Are you astrologer?</label><br /><br />
                                    <label htmlFor="yes" style={{ marginLeft: '15px' }}>Yes</label>
                                    <input type="radio"
                                        id="yes"
                                        name="isAstrologer"
                                        value={true}
                                        onChange={changeHandler}
                                    /><br/>
                                    <label htmlFor="no" style={{ marginLeft: '15px' }}>No</label>
                                    <input type="radio"
                                        id="no"
                                        name="isAstrologer"
                                        value={false}
                                        onChange={changeHandler}
                                    />
                                </div>
                                <button className={'rowsignup'} onClick={nextStep}>Next</button>
                            </div>
                        </div>
                    </div>
                    {/* <Link className='loginPage' to={"/"}>
                        Go to Login Page
                    </Link><br/><br/> */}
                </div><br /><br />
            </div><br></br>
        </div>
    )
}

export default SignupFormStep1
