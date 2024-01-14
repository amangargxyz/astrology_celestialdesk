import React, { useEffect, useReducer, useState } from 'react'
import UserService from '../services/user.service'
import QueryMainPage from './QueryMainPage'
import { useLocation } from 'react-router-dom'
import UserMainPage from './UserMainPage'
import { CurrentUserContext } from './MainPage'
import ShareLink from './ShareLink'

const initialQueriesState = {
    queryList: [],
    loading: true,
    error: null
}

const quriesStateReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return { ...state, queryList: action.value, loading: false, error: null }
        case 'FETCH_ERROR':
            return { ...state, queryList: [], loading: false, error: action.value }
        default:
            return state
    }
}

const initialLoggedUsersState = {
    loggedUsersList : {},
    loading : true,
    error : null
}

const loggedUsersStateReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'FETCH_SUCCESS' : 
            return {...state, loggedUsersList : action.value, loading : false, error : null}
        case 'FETCH_ERROR' : 
            return {...state, loggedUsersList : {}, loading : false, error : action.value}
        default : 
            return state
    }
}

function ClientChat() {
    const location = useLocation();
    const { userId, userRole, client } = location.state || {};
    const [queryState, queriesDispatch] = useReducer(quriesStateReducer, initialQueriesState)
    const [loggedUsersState, loggedUsersDispatch] = useReducer(loggedUsersStateReducer, initialLoggedUsersState)

    const handleMarkAsSeen = (id) => {
        try {
            UserService.updateQuerySeen(id)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const fetchAstrologerChat = async () => {
        console.log(client)
        try {
            UserService.getAstrologerChat(client.id, userId).then(
                (response) => {
                    queriesDispatch({ type: 'FETCH_SUCCESS', value: response.data })
                }
            )
        } catch (error) {
            queriesDispatch({ type: 'FETCH_ERROR', value: error })
        }
    }

    const fetchLoggedUsers = async () => {
        try {
            UserService.getLoggedUsers().then(
                (response) => {
                    loggedUsersDispatch({ type : 'FETCH_SUCCESS', value : response.data })
                }
            )
        } catch(error) {
            loggedUsersDispatch({ type : 'FETCH_ERROR', value: error })
        }
    }

    useEffect(() => {
        fetchAstrologerChat()
        fetchLoggedUsers()
    }, [])

    const queries = <div>
        {queryState.loading ? (
            <p>loading...</p>
        ) : queryState.error ? (
            <p>Error : {queryState.error}</p>
        ) : (
            <div>
                {
                    queryState.queryList.map((q, queryIndex) => (
                        <QueryMainPage key={queryIndex}
                            query={q}
                            fetchQuery={fetchAstrologerChat}
                            onMarkAsSeen={() => handleMarkAsSeen(q.id)}
                        />
                    ))
                }
            </div>
        )}
    </div>

    return (
        <div>
            <ShareLink userId={userId} />
            <div className="container">
                <div className="row">
                    <CurrentUserContext.Provider value={{ userId: userId, userRole: userRole }}>
                        <div className="col-lg-4">
                            {/* User info card */}
                            <UserMainPage />
                        </div>

                        {/* Query and reply cards */}
                        <div className="col-lg-8">
                            <div className="rightCards">
                                <div className="card">
                                    <div className="card-body">
                                        <div className='astrologer-chat'>
                                            <h3>
                                                {client.fullName}&emsp;
                                                {loggedUsersState.loggedUsersList[client.id] ? (
                                                    <i className="fa fa-circle icon green-dot"><span>&nbsp;Online</span></i>
                                                ) : (
                                                    <i className="fa fa-circle icon red-dot"><span>&nbsp;Offline</span></i>
                                                )}
                                            </h3>
                                        </div><br /><br />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <li className="list-group-item rightCards">
                                    <div className="card">
                                        <div className="card-body" style={{ textAlign: 'left' }}>
                                            <h5 className="card-title">Queries</h5>
                                            <div>{queries}</div>
                                        </div>
                                    </div>
                                </li>
                            </div>
                        </div>
                    </CurrentUserContext.Provider>
                </div>
            </div>
        </div>
    )
}

export default ClientChat
