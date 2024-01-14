import React, { useReducer, useContext, useEffect } from 'react'
import { CurrentUserContext } from './MainPage'
import UserService from '../services/user.service'
import '../css/myMainPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const initialUser = {
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    mobile: '',
    username: '',
    dob: '',
    birthTime: '',
    birthPlace: '',
    state: '',
    city: '',
    isAstrologer: false,
    isAdmin: false,
    role: ''
}

const userReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'FETCH_SUCCESS': {
            return {
                firstName: action.value.firstName,
                lastName: action.value.lastName,
                gender: action.value.gender,
                email: action.value.email,
                mobile: action.value.mobile,
                username: action.value.username,
                dob: action.value.dob,
                birthTime: action.value.birthTime,
                birthPlace: action.value.birthPlace,
                state: action.value.state,
                city: action.value.city,
                isAstrologer: action.value.isAstrologer,
                isAdmin: action.value.isAdmin,
                role: action.value.role
            }
        }
        case 'FETCH_ERROR': {
            return initialUser
        }
        default:
            return state
    }
}

function UserMainPage() {
    const currentUserContext = useContext(CurrentUserContext)
    const userId = currentUserContext.userId
    const userRole = currentUserContext.userRole

    const [user, userDispatch] = useReducer(userReducer, initialUser)

    const styleBlack = {
        color: 'black'
    }

    const fetchUserData = async () => {
        try {
            UserService.getUser(userId).then(
                (response) => {
                    userDispatch({ type: 'FETCH_SUCCESS', value: response.data })
                }
            )
        } catch (error) {
            userDispatch({ type: 'FETCH_ERROR', value: error })
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return (
        <div className="card">
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item text-center leftCards">
                        <img className="userPic" src="https://cdn.jsdelivr.net/gh/aman-grg/HTML_Assignment@2051c7378a4ea77a31d3da779e004274ec12beea/User%20Profile%20Pic.jpg" alt="UserProfilePic" /><br />
                        <p>
                            <span className="lead font-weight-bold">{user.firstName}  {user.lastName}</span><br />
                            <span className="small text-muted">{user.role}</span>
                        </p>
                    </li>
                    <li className="list-group-item text-left text-muted leftCards" style={{ textAlign: 'left' }}>
                        <i className="fa fa-calendar icon" style={styleBlack}><span className="small">&emsp;&emsp; {user.dob}</span></i><br />
                        <i className="fa fa-clock-o icon" style={styleBlack}><span className="small">&emsp;&emsp; {user.birthTime}</span></i><br />
                        <i className="fa fa-user icon" style={styleBlack}><span className="small">&emsp;&emsp; {user.gender}</span></i><br />
                        <i className="fa fa-map-marker icon" style={styleBlack}><span className="small">&emsp;&emsp; {user.city}, {user.state}</span></i><br />
                        <i className="fa fa-phone icon" style={styleBlack}><span className="small">&emsp;&emsp; {user.mobile}</span></i><br />
                        <i className="fa fa-envelope-o icon" style={styleBlack}><span className="small">&emsp;&emsp;{user.email}</span></i><br />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserMainPage
