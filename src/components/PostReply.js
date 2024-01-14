import React, { useState, useContext } from 'react'
import UserService from '../services/user.service'
import { CurrentUserContext } from './MainPage'
import '../css/myMainPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function PostReply({fetchQuery, queryId}) {
    const currentUser = useContext(CurrentUserContext)
    const userId = currentUser.userId
    const userRole = currentUser.userRole

    const [isReplyLoading, setIsReplyLoading] = useState(false)
    const [replyString, setReplyString] = useState('')

    const replyChangeHandler = (e) => {
        setReplyString(e.target.value)
    }

    const postReplyHandler = async (queryId) => {
        setIsReplyLoading(true)

        try {
            UserService.addReply(queryId, userId, new Date(), replyString, userRole)
            setIsReplyLoading(false)
            window.location.reload()
        } catch (error) {
            console.error('Error:', error)
            setIsReplyLoading(false)
        }
        setReplyString('')
        fetchQuery()
    }

    return (
        <div>
            <input style={{ position:'relative', left: '-200px', width: '730px' }}
                type="text"
                id="reply"
                name="reply"
                value={replyString}
                onChange={replyChangeHandler}
                placeholder="Write a reply..."
            />
            <button onClick={() => postReplyHandler(queryId)} disabled={isReplyLoading}>
                {isReplyLoading ? 'Replying...' : 'Reply'}
            </button>
        </div>
    )
}

export default PostReply
