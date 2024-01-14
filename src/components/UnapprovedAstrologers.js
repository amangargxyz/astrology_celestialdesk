import React, { useEffect, useReducer } from 'react'
import UserService from '../services/user.service'

const initialAstrologerState = {
    astrologerList : [],
    loading : true,
    error : null
}

const astrologerStateReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'FETCH_SUCCESS': {
            return {...state, astrologerList : action.value, loading : false, error : null}
        }
        case 'FETCH_ERROR': {
            return {...state, astrologerList : [], loading : false, error : action.value}
        }
        default:
            return state
    }
}

function UnapprovedAstrologers() {
    const [astrologerState, astrologerDispatch] = useReducer(astrologerStateReducer, initialAstrologerState)

    const handleApprove = async (id) => {
        try {
            UserService.approveAstrologer(id)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
        fetchUnapprovedAstrologerData()
    }

    const handleDeny = async (id) => {
        try {
            UserService.denyAstrologer(id)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
        fetchUnapprovedAstrologerData()
    }

    const fetchUnapprovedAstrologerData = async () => {
        try {
            UserService.getAllUnapprovedAstrologer().then(
                (response) => {
                    astrologerDispatch({ type : "FETCH_SUCCESS", value : response.data })
                }
            )
        } catch (error) {
            astrologerDispatch({ type : "FETCH_ERROR", value : error })
        }
    }

    useEffect(() => {
        fetchUnapprovedAstrologerData()
    }, [])

    const astrologers = <ul className="list-group list-group-flush">
        {astrologerState.loading ? (
            <p>loading...</p>
        ) : astrologerState.error ? (
            <p>Error : {astrologerState.error}</p>
        ) : (
            <div>
                {
                    astrologerState.astrologerList.map((a) => (
                        <li className="list-group-item leftCards" key={a.id}>
                            <h6>{a.firstName} {a.lastName}</h6><br />
                            <button onClick={() => {handleApprove(a.id)}}>Verify</button>&nbsp;&nbsp;&nbsp;
                            <button onClick={() => {handleDeny(a.id)}}>Deny</button>
                        </li>
                    ))
                }
            </div>
        )}
    </ul>

    return (
        (astrologerState.astrologerList.length > 0) ? (
            <div className="card">
                <div className="card-body" style={{ textAlign: 'left' }}>
                    <h5 className="card-title">Unapproved Astrologers</h5>
                    {astrologers}
                </div>
            </div>
        ) : (
            <div></div>
        )
    )
}

export default UnapprovedAstrologers
