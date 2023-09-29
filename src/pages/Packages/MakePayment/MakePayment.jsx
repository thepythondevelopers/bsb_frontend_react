import React, { useState, useEffect } from 'react';
import '../style.css';
import { useNavigate } from "react-router-dom";

function MakePayment() {
    const navigate = useNavigate();
    const [stripe, setStripe] = useState({
        cardnumber: "",
        cardowner: "",
        exprymonth: "",
        expryyear: "",
        cvv: ""
    });
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const handleStripe = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setStripe({ ...stripe, [name]: value });
    }
    // validation
    const validation = (values) => {
        let error = {};
        if (!values.cardnumber) {
            error.cardnumber = "Card number is required"
        } else if (values.cardnumber.length < 16) {
            error.cardnumber = 'Card number must be on 16 characters';
        } else if (values.cardnumber.length > 16) {
            error.cardnumber = 'Phone number not be exceed on 16 characters';
        };
        if (!values.cvv) {
            error.cvv = "cvv number is required"
        } else if (values.cvv.length < 3) {
            error.cvv = 'Card number must be on 3 characters';
        } else if (values.cvv.length > 3) {
            error.cvv = 'Phone number not be exceed on 3 characters';
        };
        if (!values.cardowner) {
            error.cardowner = "Owner name is required"
        };
        return error;
    }
    const onStripeSubmit = (e) => {
        e.preventDefault();
        setErrors(validation(stripe));
        setIsSubmit(true);
    }
    useEffect(() => {

        if (Object.keys(errors).length === 0 && isSubmit) {
            navigate("/thank-you")
        }
    }, [errors])
    return (
        <>
            <div className='body-wrap'>
                <div className='ctm-container'>
                    <div className='pack-cmn_heading'>
                        <img src="/assets/images/large-logo.png" alt="Large Logo" />
                        <h2>Make Payment</h2>
                    </div>
                    <div className='big-card paymentWrap'>
                        <div className='paymentBoxform'>
                            <div className='successMessage'><p>Enter card details</p></div>
                            <div className='paymentCards'>
                                <figure>
                                    <img src="/assets/images/visa.png" alt="Visa Card" />
                                </figure>
                                <figure>
                                    <img src="/assets/images/amex.png" alt="amex Card" />
                                </figure>
                                <figure>
                                    <img src="/assets/images/diners-club.png" alt="diners-club Card" />
                                </figure>
                                <figure>
                                    <img src="/assets/images/discover.png" alt="discover Card" />
                                </figure>
                                <figure>
                                    <img src="/assets/images/jcb.png" alt="jcb Card" />
                                </figure>
                                <figure>
                                    <img src="/assets/images/master-card.png" alt="master-card Card" />
                                </figure>
                            </div>
                            <div className='payentform'>

                                <div className='formgroup'>
                                    <div className='forminputWrap'>
                                        <label htmlFor="cardnumber">Card number <span>Enter the 16-digit card number on the card</span></label>
                                        <input type="number" name='cardnumber' id='cardnumber' className='form-control' onChange={handleStripe} value={stripe.cardnumber} />
                                    </div>
                                    {errors.cardnumber && <p className='error'>{errors.cardnumber}</p>}
                                </div>
                                <div className='formgroup'>
                                    <div className='forminputWrap'>
                                        <label htmlFor="cardowner">Card Owner <span>Enter the name on the card</span></label>
                                        <input type="text" name='cardowner' id='cardowner' className='form-control' onChange={handleStripe} value={stripe.cardowner} />
                                    </div>
                                    {errors.cardowner && <p className='error'>{errors.cardowner}</p>}
                                </div>
                                <div className='formgroup'>
                                    <div className='forminputWrap'>
                                        <label htmlFor="expirtdate">Expiry date <span>Enter the expration date of the card</span></label>
                                        <div className='expiry-date'>
                                            <input type="number" max={2} name="exprymonth" id="exprymonth" onChange={handleStripe} value={stripe.exprymonth} />
                                            <p>/</p>
                                            <input type="number" max={2} name="expryyear" id="expryyear" placeholder='00' onChange={handleStripe} value={stripe.expryyear} />
                                            <div className='formgroup'>
                                                <div className='forminputWrap'>
                                                    <label htmlFor="cvv">CVV <span>Security code</span></label>
                                                    <input type="number" max={3} name="cvv" id="cvv" placeholder='000' onChange={handleStripe} value={stripe.cvv} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {errors.cvv && <p className='error'>{errors.cvv}</p>}
                                </div>
                                <div className='formBtnGrouop'>
                                    <button className='btn cmn_red_bg' onClick={(e) => navigate("/packages")}>Cancel Payment</button>
                                    <button className='btn cmn_yellow_bg' onClick={(e) => onStripeSubmit(e)}>Submit Payment</button>
                                </div>
                            </div>
                        </div>
                        <div className='paymentBoxInfo'>
                            <h4><span>Product:</span> Starter Package</h4>
                            <ul className='paymentInfoList'>
                                <li><span>Price</span><span>€3.99</span></li>
                                <li><span>Taxes</span><span>€0.00</span></li>
                                <li><span>Total</span><span>€3.99</span></li>
                            </ul>
                            <img src="/assets/images/secure-payment-icon.png" alt="Secure Payment Icon" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MakePayment