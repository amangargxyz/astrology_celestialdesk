import React, { useEffect, useState } from 'react'
import '../css/myAstrologerQuery.css'

function AstrologerQueryCard({ astrologer, onSelect }) {
    const [selected, setSelected] = useState(false)

    const toggleSelection = () => {
        setSelected(!selected)
    }

    useEffect(() => {
        onSelect(astrologer.id, selected)
    }, [selected])

    return (
        <div className={`astrologer-card ${selected ? 'selected' : ''}`} onClick={toggleSelection}>
            <h3>{astrologer.userAstrologerResponseDto.fullName}</h3>
            {
                (astrologer.userAstrologerResponseDto.isApproved) ? 
                (<h3>Verified</h3>) : 
                (<h3>Not Verified</h3>)
            }
        </div>
    )
}

export default AstrologerQueryCard
