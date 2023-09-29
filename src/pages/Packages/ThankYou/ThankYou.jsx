import React, { useEffect } from 'react';
import '../style.css';
import { useNavigate } from "react-router-dom";

function ThankYou() {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/login");
        }, 5000);
    })
    return (
        <>
            <div className='body-wrap'>
                <div className='ctm-container'>
                    <div className='register-header'>
                        <img src="/assets/images/large-logo.png" alt="Large Logo" />
                        <h2 className='auth-page-heading'>Enmeldung</h2>
                    </div>
                    <div className='big-card'>
                        <div className='thankyou-cardWrap'>
                            <img src="assets/images/thumbs-up.png" alt="Thank you thumb" />
                            <h1 className='heading'>Thank You!</h1>
                            <h4 className='subheading'>We thank you for the payment made today.</h4>
                            <p>You will receive confirmation email shortly. <br />
                                In case of any queries please feel free to get in touch with us.</p>
                            <em>Thank you for being a valued customer.</em>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ThankYou