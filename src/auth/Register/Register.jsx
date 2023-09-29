import React, { useState, useEffect } from 'react';
import '../style.css';
import { useNavigate, Link } from "react-router-dom";
const API = process.env.REACT_APP_API_BASE_URL

function Register() {
    const navigate = useNavigate();
    const [userRegister, setUserRegister] = useState({
        email: "",
        password: "",
        repeatPassword: "",
        company_name: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        street: "",
        house_number: "",
        postal_code: "",
        city: "",
        land: "",
        sales_tax_id: ""
    });
    const [error, setError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [agreePolicy, setAgreePolicy] = useState(false);
    const [policyError, setPolicyError] = useState("");

    // On value change
    const registerHandleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserRegister({ ...userRegister, [name]: value });
    }

    // On Form Submit
    const onRegisterSubmit = (e) => {
        e.preventDefault();
        setError(registerValidation(userRegister));
        setIsSubmit(true);
        if (agreePolicy === false) {
            setPolicyError("please agree terms of services");
        } else {
            setPolicyError("");
        }
    }

    // register api
    async function registerApi() {
        const item = userRegister;
        delete item.repeatPassword;
        let result = await fetch(`${API}/sign-up`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        })
        result = await result.JSON();
    }

    useEffect(() => {
        console.log(error);
        if (Object.keys(error).length === 0 && agreePolicy === true && isSubmit) {
            registerApi();
            setTimeout(() => {
                navigate("/packages/payment");
            }, 1000);
        }
    }, [error])

    // Register form validation
    function registerValidation(values) {
        let errors = {};
        if (!values.email) {
            errors.email = 'E-mail address is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email address is invalid';
        };
        if (!values.password) {
            errors.password = 'Passwort is required';
        } else if (values.password.length < 8) {
            errors.password = 'Passwort must be 8 or more characters';
        };
        if (!values.repeatPassword) {
            errors.repeatPassword = 'Passwort wiederholen is required';
        } else if (values.password != values.repeatPassword) {
            errors.repeatPassword = 'Passwort not matched';
        };
        if (!values.first_name) {
            errors.first_name = 'Vorname is required';
        };
        if (!values.last_name) {
            errors.last_name = 'Nachname is required';
        };
        if (!values.phone_number) {
            errors.phone_number = 'Telefon is required';
        } else if (values.phone_number.length < 10) {
            errors.phone_number = 'Telefon must be greater than 10 characters';
        };
        if (!values.street) {
            errors.street = 'Straße is required';
        };
        if (!values.house_number) {
            errors.house_number = 'Hausnummer is required';
        };
        if (!values.postal_code) {
            errors.postal_code = 'Postleitzahl is required';
        };
        if (!values.city) {
            errors.city = 'Ort name is required';
        };
        return errors;
    };
    return (
        <div className='auth-page register-page'>
            <div className='ctm-container'>
                <div className='register-header'>
                    <img src="/assets/images/large-logo.png" alt="Large Logo" />
                    <h2 className='auth-page-heading'>Registrieren </h2>
                </div>
                <form onSubmit={onRegisterSubmit}>
                    <div className='auth-page-wrap big-card'>
                        <div className='auth-page-form'>
                            <div className='form-group'>
                                <label htmlFor="email">E-Mail Adresse</label>
                                <input type="email" name='email' id='email' className='form-control' placeholder='E-Mail Adresse' onChange={registerHandleInput} value={userRegister.email} />
                                {error.email && <p className='error'>{error.email}</p>}
                            </div>
                            <div className='form-group'>
                                <label htmlFor="password">Passwort</label>
                                <input type="password" name='password' id='password' className='form-control' placeholder='Passwort' onChange={registerHandleInput} value={userRegister.password} />
                                {error.password && <p className='error'>{error.password}</p>}
                            </div>
                            <div className='form-group'>
                                <label htmlFor="repeatPassword">Passwort wiederholen</label>
                                <input type="password" name='repeatPassword' id='repeatPassword' className='form-control' placeholder='Passwort' onChange={registerHandleInput} value={userRegister.repeatPassword} />
                                {error.repeatPassword && <p className='error'>{error.repeatPassword}</p>}
                            </div>
                            <div className='form-group'>
                                <label htmlFor="company_name">Firmenname</label>
                                <input type="text" name='company_name' id='company_name' className='form-control' placeholder='Firmenname' onChange={registerHandleInput} value={userRegister.company_name} />
                                {error.company_name && <p className='error'>{error.company_name}</p>}
                            </div>
                            <div className='form-group'>
                                <label htmlFor="sales_tax_id">Umsatzsteuer ID</label>
                                <input type="text" name='sales_tax_id' id='sales_tax_id' className='form-control' placeholder='Umsatzsteuer ID' onChange={registerHandleInput} value={userRegister.sales_tax_id} />
                                {error.sales_tax_id && <p className='error'>{error.sales_tax_id}</p>}
                            </div>
                            <div className='form-group'>
                                <label htmlFor="land">Land</label>
                                <input type="text" name='land' id='land' className='form-control' placeholder='Land' onChange={registerHandleInput} value={userRegister.land} />
                                {error.land && <p className='error'>{error.land}</p>}
                            </div>
                            <div className='login-page-forget'>
                                <div className='ctm-checkbox'>
                                    <label className="ctm-checkbox-container" onClick={(e) => setAgreePolicy(e.target.checked)}>I agree to the <Link to="/term-conditions">terms of services</Link> of this website.
                                        <input type="checkbox" />
                                        <span className="ctm-checkbox-checkmark"></span>
                                    </label>
                                    {policyError && <p className='error'>{policyError}</p>}
                                </div>
                            </div>
                        </div>
                        <div className='auth-page-form'>
                            <div className='form-col'>
                                <div className='form-group'>
                                    <label htmlFor="first_name">Vorname</label>
                                    <input type="text" name='first_name' id='first_name' className='form-control' placeholder='Vorname' onChange={registerHandleInput} value={userRegister.first_name} />
                                    {error.first_name && <p className='error'>{error.first_name}</p>}
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="last_name">Nachname</label>
                                    <input type="text" name='last_name' id='last_name' className='form-control' placeholder='Nachname' onChange={registerHandleInput} value={userRegister.last_name} />
                                    {error.last_name && <p className='error'>{error.last_name}</p>}
                                </div>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="phone_number">Telefon</label>
                                <input type="tel" name='phone_number' id='phone_number' className='form-control' placeholder='Telefon' onChange={registerHandleInput} value={userRegister.phone_number} />
                                {error.phone_number && <p className='error'>{error.phone_number}</p>}
                            </div>
                            <div className='form-group'>
                                <label htmlFor="street">Straße</label>
                                <input type="text" name='street' id='street' className='form-control' placeholder='Straße' onChange={registerHandleInput} value={userRegister.street} />
                                {error.street && <p className='error'>{error.street}</p>}
                            </div>
                            <div className='form-group'>
                                <label htmlFor="house_number">Hausnummer</label>
                                <input type="text" name='house_number' id='house_number' className='form-control' placeholder='Hausnummer' onChange={registerHandleInput} value={userRegister.house_number} />
                                {error.house_number && <p className='error'>{error.house_number}</p>}
                            </div>
                            <div className='form-group'>
                                <label htmlFor="postal_code">Postleitzahl</label>
                                <input type="text" name='postal_code' id='postal_code' className='form-control' placeholder='Postleitzahl' onChange={registerHandleInput} value={userRegister.postal_code} />
                                {error.postal_code && <p className='error'>{error.postal_code}</p>}
                            </div>
                            <div className='form-group'>
                                <label htmlFor="city">Ort</label>
                                <input type="text" name='city' id='city' className='form-control' placeholder='Ort' onChange={registerHandleInput} value={userRegister.city} />
                                {error.city && <p className='error'>{error.city}</p>}
                            </div>
                            <button type="submit">Weiter zur Zahlung</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register