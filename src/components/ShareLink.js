import React from 'react'
import '../css/myShareLink.css'
import AuthService from '../services/auth.service'
import { Link, useNavigate } from 'react-router-dom'
import { EmailShareButton, FacebookMessengerShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';

function ShareLink({ userId }) {
    // const shareUrl = 'http://localhost:3000'
    const shareUrl2 = 'https://www.celestialdesk.com'
    const navigate = useNavigate()

    const logoutHandler = () => {
        AuthService.logout(userId)
        navigate("/")
    }

    return (
        <div className="column">
            <div className="row r1">
                <p style={{
                    position: 'relative',
                    left: '-600px',
                    top: '15px',
                    fontSize: '25px'
                }}>CelestialDesk.com</p>
                <p className="icon" style={{
                    position: 'relative',
                    top: '-30px',
                    fontSize: '20px'
                }}>Get connected with us on social networks!
                    <FacebookMessengerShareButton
                        url={shareUrl2}
                    >
                        <i className="fa fa-facebook-f"></i>
                    </FacebookMessengerShareButton>
                    <TwitterShareButton
                        url={shareUrl2}
                        title='Astrology'
                    >
                        <i className="fa fa-twitter"></i>
                    </TwitterShareButton>
                    <EmailShareButton
                        url={shareUrl2}
                    >
                        <i className="fa fa-google-plus"></i>
                    </EmailShareButton>
                    <WhatsappShareButton
                        url={shareUrl2}
                    >
                        <i className="fa fa-whatsapp"></i>
                    </WhatsappShareButton>
                    <button className='logout' 
                            onClick={logoutHandler}
                            style={{
                                position: 'relative',
                                left: '400px',
                                top: '-5px'
                            }}><span className="fa fa-sign-in icon"></span> Logout</button>
                </p>
            </div>
        </div>
    )
}

export default ShareLink