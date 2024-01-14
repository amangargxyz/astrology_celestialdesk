import React, { useContext, useEffect, useReducer } from 'react'
import '../css/myAstrologerQuery.css'
import { useNavigate } from "react-router-dom"
import { CurrentUserContext } from './MainPage'
import UserService from '../services/user.service'

// const initialClientNewMessage = {
//     clientNewMessageList : {},
//     loading : true,
//     error : null
// }

// const clientNewMessageStateReducer = (state, action) => {
//     console.log(action)
//     switch (action.type) {
//         case 'FETCH_SUCCESS' : 
//             return {...state, clientNewMessageList : action.value, loading : false, error : null}
//         case 'FETCH_ERROR' : 
//             return {...state, clientNewMessageList : {}, loading : false, error : action.value}
//         default : 
//             return state
//     }
// }

function ClientCards({ clients, loggedUsers, clientNewMessageList }) {
    const currentUser = useContext(CurrentUserContext)
    const userId = currentUser.userId
    const userRole = currentUser.userRole

    const navigate = useNavigate()

    // const [clientNewMessageState, clientNewMessageDispatch] = useReducer(clientNewMessageStateReducer, initialClientNewMessage)

    const openClientChat = (client) => {
        navigate('/clientChat', { state: { userId, userRole, client } })
    }

    // const fetchClientNewMessage = async () => {
    //     try {
    //         UserService.getNewMessage(userId, userRole).then(
    //             (response) => {
    //                 clientNewMessageDispatch({ type : 'FETCH_SUCCESS', value : response.data })
    //             }
    //         )
    //     } catch(error) {
    //         clientNewMessageDispatch({ type : 'FETCH_ERROR', value: error })
    //     }
    // }

    // useEffect((
    //     fetchClientNewMessage()
    // ), [])

    return (
        <div>
            <h3>List of available Clients:</h3>
            <div className='astrologer-list'>
                {clients.map((client) => (
                    <div className='astrologer-card' key={client.id} onClick={() => openClientChat(client)}>
                        {clientNewMessageList[client.id] ? (
                            <h3 className='unseen'>
                                {client.fullName}&emsp;
                                {loggedUsers[client.id] ? (
                                    <i className="fa fa-circle icon green-dot"><span>&nbsp;Online</span></i>
                                ) : (
                                    <i className="fa fa-circle icon red-dot"><span>&nbsp;Offline</span></i>
                                )
                                }
                            </h3>
                        ) : (
                            <h3>
                                {client.fullName}&emsp;
                                {loggedUsers[client.id] ? (
                                    <i className="fa fa-circle icon green-dot"><span>&nbsp;Online</span></i>
                                ) : (
                                    <i className="fa fa-circle icon red-dot"><span>&nbsp;Offline</span></i>
                                )
                                }
                            </h3>
                        )}
                        {/* <h3>
                            {client.fullName}&emsp;
                            {loggedUsers[client.id] ? (
                                <i className="fa fa-circle icon green-dot"><span>&nbsp;Online</span></i>
                            ) : (
                                <i className="fa fa-circle icon red-dot"><span>&nbsp;Offline</span></i>
                            )
                            }
                        </h3> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClientCards
