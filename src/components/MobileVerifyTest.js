import React, { useState } from 'react'
import AuthService from '../services/auth.service';
import '../css/myMobileVerify.css'

function MobileVerifyTest({mobile, dispatch}) {
    const [otp, setOtp] = useState('');
    const [isMobileVerified, setIsMobileVerified] = useState(false);
    const [verificationError, setVerificationError] = useState('');

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const sendOtp = async () => {
        try {
            // Send OTP to the mobile number using an API call (e.g., Twilio)
            await AuthService.sendMobileOtp(mobile);
            // Update state to indicate that OTP was sent
            setIsMobileVerified(false);
            dispatch({type : 'update_isMobileVerified', value : false})
            setVerificationError('');
        } catch (error) {
            setVerificationError('Error sending OTP. Please try again.');
        }
    };

    const verifyOtp = async () => {
        try {
            // Verify the OTP entered by the user
            const response = await AuthService.verifyMobile(mobile, otp);
            console.log(response)
            if (response.data === 'Otp is verified') {
                setIsMobileVerified(true);
                dispatch({type : 'update_isMobileVerified', value : true})
                setVerificationError('');
            } else {
                setIsMobileVerified(false);
                dispatch({type : 'update_isMobileVerified', value : true})
                setVerificationError('Invalid OTP. Please try again.');
            }
        } catch (error) {
            setVerificationError('Error verifying OTP. Please try again.');
        }
    };

    return (
        <div className='white'>
            <button onClick={sendOtp} style={{
                                position: 'relative',
                                left: '25px'
                            }}>Send OTP</button>

            {verificationError && <p>{verificationError}</p>}

            {!isMobileVerified && (
                <div>
                    <label htmlFor="otp" style={{
                                position: 'relative',
                                left: '25px'
                            }}>Enter OTP:</label><br/>
                    <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder='Enter OTP'
                    />
                    <button onClick={verifyOtp} style={{
                                position: 'relative',
                                left: '25px'
                            }}>Verify OTP</button>
                </div>
            )}

            {isMobileVerified && <p>Mobile number verified!</p>}
        </div>
    );

}

export default MobileVerifyTest
