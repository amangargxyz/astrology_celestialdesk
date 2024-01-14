import React, { useState, useContext, useEffect } from 'react'
import ReplyMainPage from './ReplyMainPage'
import UserService from '../services/user.service'
import { CurrentUserContext } from './MainPage'
import PostReply from './PostReply'
import '../css/myMainPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function QueryMainPage({query, fetchQuery, onMarkAsSeen}) {
    const currentUserContext = useContext(CurrentUserContext)
    const userId = currentUserContext.userId
    const userRole = currentUserContext.userRole

    const [editedQueryString, setEditedQueryString] = useState('')
    const [isQueryEditing, setIsQueryEditing] = useState(false)

    const handleQueryEditClick = (value) => {
        setEditedQueryString(value)
        setIsQueryEditing(true)
    }

    const handleQuerySaveClick = async (id) => {
        updateQueryHandler(id)
        window.location.reload()
        setIsQueryEditing(false)
    }

    const handleQueryCancelClick = (value) => {
        setEditedQueryString(value)
        setIsQueryEditing(false)
    }

    const handleMarkAsSeen = (id) => {
        try {
            UserService.updateReplySeen(id, userRole)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const updateQueryHandler = async (id) => {
        try {
            UserService.updateQuery(id, new Date(), editedQueryString)
        } catch (error) {
            console.error('Error:', error)
        }
        setEditedQueryString('')
        fetchQuery()
    }

    const deleteQueryHandler = async (id) => {
        try {
            UserService.deleteQuery(id)
            window.location.reload()
        } catch (error) {
            console.log('Error:'. error)
        }
        fetchQuery()
    }

    useEffect(() => {
        // Mark the message as seen when it is rendered on the screen
        if (userRole === 'ROLE_ASTROLOGER' && !query.astrologerSeen) {
            onMarkAsSeen()
        }
    }, [query, onMarkAsSeen])

    return (
        <div key={query.id}>
            <p>{query.userQueryResponseDto.fullName} | {query.userQueryResponseDto.role} | {query.datetime}
                {(userId === 1) && (
                    <i className="fa fa-pencil icon" style={{
                        position: 'relative',
                        left: '50px',
                        color: 'black',
                        cursor: 'pointer'
                    }} onClick={() => { handleQueryEditClick(query.query) }} />
                )}
                {(userId === 1) && (
                    <i className="fa fa-trash icon" style={{
                        position: 'relative',
                        left: '100px',
                        color: 'black',
                        cursor: 'pointer'
                    }} onClick={() => { deleteQueryHandler(query.id) }} />
                )}
            </p>
            {isQueryEditing ? (
                <div>
                    <textarea
                        rows='3'
                        cols='50'
                        value={editedQueryString}
                        onChange={(e) => { setEditedQueryString(e.target.value) }}
                    />
                    <button onClick={() => { handleQuerySaveClick(query.id) }}>Save</button>
                    <button onClick={() => { handleQueryCancelClick(query.query) }}>Cancel</button>
                </div>
            ) : (
                <div>
                        {(userRole === 'ROLE_USER') ? (
                            (query.clientSeen) ? <p>{query.query}</p> : <p className='unseen'>{query.query}</p>
                        ) : (
                            (query.astrologerSeen) ? <p>{query.query}</p> : <p className='unseen'>{query.query}</p>
                        )}
                </div>
            )}
            <h6 style={{ padding: '30px' }}>Replies</h6>
            <ul className="list-group" style={{ padding: '30px' }}>
                {
                    query.replies.map((r, replyIndex) => (
                        <ReplyMainPage key={replyIndex}
                            reply={r}
                            fetchQuery={fetchQuery}
                            onMarkAsSeen={() => handleMarkAsSeen(r.id)}
                        />
                    ))
                }
            </ul>
            <PostReply fetchQuery={fetchQuery} queryId={query.id}/>
            <br /><br /><hr style={{ height: '5px', background: 'black' }} />
        </div>
    )
}

export default QueryMainPage
