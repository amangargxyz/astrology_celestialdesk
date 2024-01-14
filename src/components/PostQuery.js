import React, { useContext } from 'react'
import { CurrentUserContext } from './MainPage'
import '../css/myMainPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AstrologerCards from './AstrologerCards'

function PostQuery({ astrologers, loggedUsers }) {
    const currentUser = useContext(CurrentUserContext)
    const userId = currentUser.userId
    const userRole = currentUser.userRole

    return (
        <div style={{ textAlign: 'left' }}>
            {
                (userRole === "ROLE_USER") &&
                (<div className="rightCards">
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <AstrologerCards
                                    astrologers={astrologers}
                                    loggedUsers={loggedUsers}
                                />
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}

export default PostQuery
