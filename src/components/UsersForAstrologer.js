import React, { useContext, useEffect, useReducer } from 'react'
import { CurrentUserContext } from './MainPage'
import '../css/myMainPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserService from '../services/user.service'
import ClientCards from './ClientCards'

const initialClientState = {
    clientList : [],
    loading : true,
    error : null
}

const clientStateReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'FETCH_SUCCESS' : 
            return {...state, clientList : action.value, loading : false, error : null}
        case 'FETCH_ERROR' : 
            return {...state, clientList : [], loading : false, error : action.value}
        default : 
            return state
    }
}

const initialClientNewMessage = {
    clientNewMessageList : {},
    loading : true,
    error : null
}

const clientNewMessageStateReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'FETCH_SUCCESS' : 
            return {...state, clientNewMessageList : action.value, loading : false, error : null}
        case 'FETCH_ERROR' : 
            return {...state, clientNewMessageList : {}, loading : false, error : action.value}
        default : 
            return state
    }
}

function UsersForAstrologer({ loggedUsers }) {
    const currentUser = useContext(CurrentUserContext)
    const userId = currentUser.userId
    const userRole = currentUser.userRole

    const [clientState, clientDispatch] = useReducer(clientStateReducer, initialClientState)
    const [clientNewMessageState, clientNewMessageDispatch] = useReducer(clientNewMessageStateReducer, initialClientNewMessage)

    const fetchClientsData = async () => {
        try {
            UserService.getUsersForAstrologer(userId).then(
                (response) => {
                    clientDispatch({ type : 'FETCH_SUCCESS', value : response.data })
                }
            )
        } catch(error) {
            clientDispatch({ type : 'FETCH_ERROR', value: error })
        }
    }

    const fetchClientNewMessage = async () => {
        try {
            UserService.getNewMessage(userId, userRole).then(
                (response) => {
                    clientNewMessageDispatch({ type : 'FETCH_SUCCESS', value : response.data })
                }
            )
        } catch(error) {
            clientNewMessageDispatch({ type : 'FETCH_ERROR', value: error })
        }
    }

    useEffect(() => {
        fetchClientsData()
        fetchClientNewMessage()
    }, [])

    return (
        <div style={{ textAlign: 'left' }}>
            {
                (userRole === "ROLE_ASTROLOGER") &&
                (<div className="rightCards">
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <ClientCards
                                    clients={clientState.clientList}
                                    loggedUsers={loggedUsers}
                                    clientNewMessageList={clientNewMessageState.clientNewMessageList}
                                />
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default UsersForAstrologer
