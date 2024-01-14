import React from 'react'
import UserService from '../services/user.service'

function AllAstrologers({ astrologers, fetchAstrologers }) {

    const handleDelete = async (id) => {
        try {
            UserService.deleteUser(id)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
        fetchAstrologers()
    }

    const astrologerHtml = <ul className="list-group list-group-flush">
        {
            <div>
                {
                    astrologers.map((a) => (
                        <li className="list-group-item leftCards" key={a.id}>
                            <h6>{a.userAstrologerResponseDto.fullName}</h6><br />
                            <button onClick={() => {handleDelete(a.id)}}>Delete</button>
                        </li>
                    ))
                }
            </div>
        }
    </ul>

    return (
        (astrologers.length > 0) ? (
            <div className="card">
                <div className="card-body" style={{ textAlign: 'left' }}>
                    <h5 className="card-title">Astrologers</h5>
                    {astrologerHtml}
                </div>
            </div>
        ) : (
            <div></div>
        )
    )
}

export default AllAstrologers
