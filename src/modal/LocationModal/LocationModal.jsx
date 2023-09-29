import React from 'react';
import './style.css';

const LocationModal = ({ content }) => {
    return (
        <>
            <div className="modal-wrap">
                {content}
            </div>
            <div className="modal-overlay"></div>
        </>
    )
}

export default LocationModal