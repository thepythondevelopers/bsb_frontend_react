import React, { useState, useEffect } from 'react';
import "../style.css";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
const API = process.env.REACT_APP_API_BASE_URL;

function ForgetPassword() {
    const navigate = useNavigate();
    const [forgetPass, setForgetPass] = useState({
        email: ""
    });
    const [resData, setResData] = useState({});
    console.log(resData.error);
    const [error, setError] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);
    const forgetPassHandleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForgetPass({ ...forgetPass, [name]: value });
    }
    const submitForgetform = (e) => {
        e.preventDefault();
        setError(validation(forgetPass));
        setIsSubmit(true);
        const url = resData?.url;
    }
    // Register form validation
    function validation(values) {
        let errors = {};
        if (!values.email) {
            errors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email address is invalid';
        };
        return errors;
    };
    async function forgetApi() {
        let result = await fetch(`${API}/forget-password`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(forgetPass)
        });
        result = await result.json();
        setResData(result);
        console.log("result", result)
    }
    useEffect(() => {
        if (Object.keys(error).length === 0 && isSubmit) {
            forgetApi();
        }
    }, [error])
    return (
        <>
            <div className='auth-page login-page'>

                <div className='ctm-container'>
                    <h2 className='auth-page-heading'>Passwort Vergessen</h2>
                    <div className='auth-page-wrap big-card'>
                        <div className='login-page-img'>
                            <img src="/assets/images/large-logo.png" alt="Large Logo" />
                        </div>
                        <div className='auth-page-form'>
                            <form>
                                <div className='form-group'>
                                    <label htmlFor="email">Benutzername</label>
                                    <input type="email" name='email' id='email' className='form-control' placeholder='E-Mailadresse' onChange={forgetPassHandleInput} value={forgetPass.email} />
                                    {resData?.error && <p className='error'>{resData.error}</p>}
                                    {error.email && <p className='error'>{error.email}</p>}
                                </div>
                                <button type="submit" onClick={submitForgetform}>Passwort Vergessen</button>
                                {resData.message && (<>
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        <Alert severity="success">{resData.message} — check it out!</Alert>
                                    </Stack>
                                </>)}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword