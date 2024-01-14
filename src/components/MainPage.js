import React, { useEffect, useReducer } from 'react'
import AuthService from '../services/auth.service'
import UserService from '../services/user.service'
import UserMainPage from './UserMainPage'
import QueryMainPage from './QueryMainPage'
import PostQuery from './PostQuery'
import '../css/myMainPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import UnapprovedAstrologers from './UnapprovedAstrologers'
import ShareLink from './ShareLink'
import AllAstrologers from './AllAstrologers'
import AllClients from './AllClients'
import UsersForAstrologer from './UsersForAstrologer'

const initialQueriesState = {
    queryList : [],
    loading : true,
    error : null
}

const quriesStateReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'FETCH_SUCCESS' : 
            return {...state, queryList : action.value, loading : false, error : null}
        case 'FETCH_ERROR' : 
            return {...state, queryList : [], loading : false, error : action.value}
        default : 
            return state
    }
}

const initialAstrologerState = {
    astrologerList : [],
    loading : true,
    error : null
}

const astrologerStateReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'FETCH_SUCCESS' : 
            return {...state, astrologerList : action.value, loading : false, error : null}
        case 'FETCH_ERROR' : 
            return {...state, astrologerList : [], loading : false, error : action.value}
        default : 
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

export const CurrentUserContext = React.createContext()

function MainPage() {
    const currentUser = AuthService.getCurrentUser()
    const userId = currentUser.id
    const userRole = currentUser.roles[0]

    const [queryState, queriesDispatch] = useReducer(quriesStateReducer, initialQueriesState)
    const [astrologerState, astrologerDispatch] = useReducer(astrologerStateReducer, initialAstrologerState)
    const [loggedUsersState, loggedUsersDispatch] = useReducer(loggedUsersStateReducer, initialLoggedUsersState)

    const fetchQueriesData = async () => {
        try {
            console.log(userRole)
            if(userRole === 'ROLE_USER') {
                UserService.getUserQueries(userId).then(
                    (response) => {
                        queriesDispatch({ type : 'FETCH_SUCCESS', value : response.data })
                    }
                )
            } else if(userRole === 'ROLE_ADMIN'){
                UserService.getAllQueries().then(
                    (response) => {
                        queriesDispatch({ type : 'FETCH_SUCCESS', value : response.data })
                    }
                )
            } else {
                UserService.getAstrologerQueries(userId).then(
                    (response) => {
                        queriesDispatch({ type : 'FETCH_SUCCESS', value : response.data })
                    }
                )
            }
        } catch (error) {
            queriesDispatch({ type: 'FETCH_ERROR', value: error.message }) 
        }
    }

    const fetchAstrologerData = async () => {
        try {
            UserService.getAllAstrologers().then(
                (response) => {
                    astrologerDispatch({ type : 'FETCH_SUCCESS', value : response.data })
                }
            )
        } catch(error) {
            astrologerDispatch({ type : 'FETCH_ERROR', value: error })
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
        fetchQueriesData()
        fetchAstrologerData()
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
                            fetchQuery={fetchQueriesData}
                        />
                    ))
                }
            </div>
        )}
    </div>

    return (
        <div>
            {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <p className="navbar-brand">TalkAstrologer.com</p>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="whiteColor" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="whiteColor" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="whiteColor" href="#">Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="whiteColor" href="#">Contact</a>
                        </li>
                    </ul>
                    <div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" onClick={logoutHandler}><span className="fa fa-sign-in icon"></span> Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> */}
            <ShareLink userId={userId} />
            {/* <VideoCall /> */}
            <div className="container">
                <div className="row">
                    <CurrentUserContext.Provider value={{ userId: userId, userRole: userRole }}>
                        <div className="col-lg-4">
                            {/* User info card */}
                            <UserMainPage />
                            {(userRole === 'ROLE_ADMIN') && (
                                <>
                                    <UnapprovedAstrologers />
                                    <AllAstrologers astrologers={astrologerState.astrologerList}
                                        fetchAstrologers={fetchAstrologerData} />
                                    <AllClients />
                                </>
                            )}
                        </div>

                        {/* Query and reply cards */}
                        <div className="col-lg-8">
                            <ul className="list-group">
                                
                                {(userRole === 'ROLE_USER') ? (
                                    <PostQuery astrologers={astrologerState.astrologerList}
                                               loggedUsers={loggedUsersState.loggedUsersList}/>
                                ) : (userRole === 'ROLE_ASTROLOGER') ? (
                                    <UsersForAstrologer loggedUsers={loggedUsersState.loggedUsersList}/>
                                ) : (
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
                                )}
                                
                            </ul>
                        </div>
                    </CurrentUserContext.Provider>
                </div>
            </div>
        </div>
    )
}

export default MainPage
