import React, { useContext } from 'react'
import '../css/myAstrologerQuery.css'
import { useNavigate } from "react-router-dom"
import { CurrentUserContext } from './MainPage'

function AstrologerCards({ astrologers, loggedUsers }) {
    const currentUser = useContext(CurrentUserContext)
    const userId = currentUser.userId
    const userRole = currentUser.userRole

    const navigate = useNavigate()

    const openAstrologerChat = (astrologer) => {
        navigate('/astrologerChat', { state: { userId, userRole, astrologer } })
    }

    return (
        <div>
            <h3>List of available Astrologers:</h3>
            <div className='astrologer-list'>
                {astrologers.map((astrologer) => (
                    <div className='astrologer-card' key={astrologer.id} onClick={() => openAstrologerChat(astrologer)}>
                        <h3>
                            {astrologer.userAstrologerResponseDto.fullName}&emsp;
                            {loggedUsers[astrologer.id] ? (
                                <i className="fa fa-circle icon green-dot"><span>&nbsp;Online</span></i>
                            ) : (
                                <i className="fa fa-circle icon red-dot"><span>&nbsp;Offline</span></i>
                            )
                            }
                        </h3>
                        <p>Experience: {astrologer.experience} years</p>
                        {
                            (astrologer.userAstrologerResponseDto.isApproved) ?
                                (<p className='verified'>Verified</p>) :
                                (<p className='notverified'>Not Verified</p>)
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AstrologerCards
