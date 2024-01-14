import React, { useReducer, useEffect } from 'react'
import UserService from '../services/user.service'

const initialClientState = {
    clientList : [],
    loading : true,
    error : null
}

const clientStateReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'FETCH_SUCCESS': {
            return {...state, clientList : action.value, loading : false, error : null}
        }
        case 'FETCH_ERROR': {
            return {...state, clientList : [], loading : false, error : action.value}
        }
        default:
            return state
    }
}

function AllClients() {
    const [clientState, clientDispatch] = useReducer(clientStateReducer, initialClientState)

    const handleDelete = async (id) => {
        try {
            UserService.deleteUser(id)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
        fetchClientsData()
    }

    const fetchClientsData = async () => {
        try {
            UserService.getAllClients().then(
                (response) => {
                    clientDispatch({ type : "FETCH_SUCCESS", value : response.data })
                }
            )
        } catch (error) {
            clientDispatch({ type : "FETCH_ERROR", value : error })
        }
    }

    useEffect(() => {
        fetchClientsData()
    }, [])

    const clients = <ul className="list-group list-group-flush">
        {
            <div>
                {
                    clientState.clientList.map((c) => (
                        <li className="list-group-item leftCards" key={c.id}>
                            <h6>{c.user.fullName}</h6><br />
                            <button onClick={() => {handleDelete(c.id)}}>Delete</button>
                        </li>
                    ))
                }
            </div>
        }
    </ul>

    return (
        (clientState.clientList.length > 0) ? (
            <div className="card">
                <div className="card-body" style={{ textAlign: 'left' }}>
                    <h5 className="card-title">Clients</h5>
                    {clients}
                </div>
            </div>
        ) : (
            <div></div>
        )
    )
}

export default AllClients
