import React from 'react';
import './style.css';

const DocumentModal = ({ content }) => {
    return (
        <>
            <div className="modal-wrap">
                {content}
            </div>
            <div className="modal-overlay"></div>
        </>
    )
}

export default DocumentModal;