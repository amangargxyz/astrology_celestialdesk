import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

function ClockTimePicker({ selectedTime, onChange }) {
    const [isClockVisible, setIsClockVisible] = useState(false);

    const handleInputChange = () => {
        setIsClockVisible(!isClockVisible);
    };

    return (
        <div style={{color: 'black'}}>
            <input
                type="text"
                value={selectedTime}
                onClick={handleInputChange}
                readOnly // Prevent manual input
            />
            {isClockVisible && (
                <TimePicker
                    value={selectedTime}
                    onChange={onChange}
                    locale='sv-sv'
                />
            )}
        </div>
    );

}

export default ClockTimePicker;
