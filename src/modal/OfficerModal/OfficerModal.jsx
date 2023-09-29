import React from 'react';

const OfficerModal = ({ content }) => {
    return (
        <>
            <div className="modal-wrap">
                {content}
            </div>
            <div className="modal-overlay"></div>
        </>
    )
}
export default OfficerModal;