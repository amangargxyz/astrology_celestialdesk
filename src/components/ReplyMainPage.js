import React, { useState, useContext, useEffect } from 'react'
import UserService from '../services/user.service'
import { CurrentUserContext } from './MainPage'
import '../css/myMainPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function ReplyMainPage({ reply, fetchQuery, onMarkAsSeen}) {
    const currentUserContext = useContext(CurrentUserContext)
    const userId = currentUserContext.userId
    const userRole = currentUserContext.userRole

    const [editedReplyString, setEditedReplyString] = useState('')
    const [isReplyEditing, setIsReplyEditing] = useState(false)

    const handleReplyEditClick = (value) => {
        setEditedReplyString(value)
        setIsReplyEditing(true)
    }

    const handleReplySaveClick = async (id) => {
        updateReplyHandler(id)
        window.location.reload()
        setIsReplyEditing(false)
    }

    const handleReplyCancelClick = (value) => {
        setEditedReplyString(value)
        setIsReplyEditing(false)
    }

    const updateReplyHandler = async (id) => {
        try {
            UserService.updateReply(id, new Date(), editedReplyString)
        } catch (error) {
            console.error('Error:', error)
        }
        setEditedReplyString('')
        fetchQuery()
    }

    const deleteReplyHandler = async (id) => {
        try {
            UserService.deleteReply(id)
            // window.location.reload()
        } catch (error) {
            console.log('Error:'. error)
        }
        fetchQuery()
    }

    useEffect(() => {
        // Mark the message as seen when it is rendered on the screen
        if (userRole === 'ROLE_USER' && !reply.clientSeen) {
            onMarkAsSeen()
        } else if (userRole === 'ROLE_ASTROLOGER' && !reply.astrologerSeen) {
            onMarkAsSeen()
        }
    }, [reply, onMarkAsSeen])

    return (
        <div>
            <li className="list-group-item" style={{ width: '730px' }} key={reply.id}>
                <p>{reply.userQueryResponseDto.fullName} | {reply.userQueryResponseDto.role} | {reply.date}
                    {(userId === 1) && (
                        <i className="fa fa-pencil icon" style={{
                            position: 'relative',
                            left: '20px',
                            color: 'black',
                            cursor: 'pointer'
                        }} onClick={() => { handleReplyEditClick(reply.reply) }} />
                    )}
                    {(userId === 1) && (
                        <i className="fa fa-trash icon" style={{
                            position: 'relative',
                            left: '50px',
                            color: 'black',
                            cursor: 'pointer'
                        }} onClick={() => { deleteReplyHandler(reply.id) }} />
                    )}
                </p>
                {isReplyEditing ? (
                    <div>
                        <textarea
                            rows='3'
                            cols='50'
                            value={editedReplyString}
                            onChange={(e) => { setEditedReplyString(e.target.value) }}
                        />
                        <button onClick={() => { handleReplySaveClick(reply.id) }}>Save</button>
                        <button onClick={() => { handleReplyCancelClick(reply.reply) }}>Cancel</button>
                    </div>
                ) : (
                    <div>
                        {(userRole === 'ROLE_USER') ? (
                            (reply.clientSeen) ? <p>{reply.reply}</p> : <p className='unseen'>{reply.reply}</p>
                        ) : (
                            (reply.astrologerSeen) ? <p>{reply.reply}</p> : <p className='unseen'>{reply.reply}</p>
                        )}
                    </div>
                )}
            </li>
        </div>
    )
}

export default ReplyMainPage
