import React from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Disclaimer({ isOpen, onClose }) {
    // if (!isOpen) return null;

    return (
        <Popup trigger=
            {<button> Click to open popup </button>}
            position="right center">
            <div>GeeksforGeeks</div>
            <button>Click here</button>
        </Popup>
    )
}

export default Disclaimer
