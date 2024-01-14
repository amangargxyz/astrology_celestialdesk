import React, { useState, useEffect } from 'react'
import AstrologerQueryCard from './AstrologerQueryCard'
import '../css/myAstrologerQuery.css'

function AstrologerQueryList({ astrologers, onSelectionChange }) {
    const [selectedAstrologers, setSelectedAstrologers] = useState({})

    const handleSelectionChange = (astrologerId, isSelected) => {
        setSelectedAstrologers((prevSelections) => ({
            ...prevSelections,
            [astrologerId]: isSelected
        }))
    }

    useEffect(() => {
        onSelectionChange(selectedAstrologers)
    }, [selectedAstrologers])

    return (
        <div className="astrologer-list">
            {astrologers.map((astrologer) => (
                <AstrologerQueryCard
                    key={astrologer.id}
                    astrologer={astrologer}
                    onSelect={handleSelectionChange}
                />
            ))}
        </div>
    )
}

export default AstrologerQueryList
