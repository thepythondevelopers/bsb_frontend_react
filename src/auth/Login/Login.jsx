import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style.css";
import axios from "axios";
const API = process.env.REACT_APP_API_BASE_URL;

function Login() {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberPass, setRememberPass] = useState("");
  const remPass = JSON.parse(localStorage.getItem("rememberPass"));
  const loginHandleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserLogin({ ...userLogin, [name]: value });
  };
  const submitLoginform = (e) => {
    e.preventDefault();
    setError(validation(userLogin));
    setIsSubmit(true);
    if (
      userLogin.email === "admin@yopmail.com" &&
      userLogin.password === "admin@yopmail.com"
    ) {
      setUserLogin({ ...userLogin, role: "admin" });
    }
  };

  // Register form validation
  function validation(values) {
    let errors = {};
    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  }

  async function loginApi() {
    //setUserLogin({ ...userLogin, "role": "admin" });
    console.log("User Login::", userLogin);
    let result = await fetch(`${API}/sign-in`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLogin),
    });
    result = await result.json();
    console.log("result of login::", result);
    if (result.token) {
      toast.success("Login Successfull");
    }
    localStorage.setItem("user-info", JSON.stringify(result));
  }

  // useEffect(() => {
  //     if (remPass) {
  //         setUserLogin(remPass);
  //     }
  //     if (Object.keys(error).length === 0 && isSubmit) {
  //         loginApi();
  //             const user = JSON.parse(localStorage.getItem("user-info"));
  //             const userError = user?.error;
  //             if (!userError) {
  //                 navigate("/");
  //                 if (rememberPass === true) {
  //                     localStorage.setItem("rememberPass", JSON.stringify(userLogin));
  //                 }
  //             } else {
  //                 setErrorMessage("Wrong Password");
  //                 //localStorage.removeItem("user-info");
  //                 navigate("/login");
  //             }
  //     }
  // }, [])

  useEffect(() => {
    if (remPass) {
      setUserLogin(remPass);
    }

    if (Object.keys(error).length === 0 && isSubmit) {
      loginApi();
      setTimeout(() => {
        const user = JSON.parse(localStorage.getItem("user-info"));
        const userError = user?.error;
        if (!userError) {
          navigate("/");
          if (rememberPass === true) {
            localStorage.setItem("rememberPass", JSON.stringify(userLogin));
          }
        } else {
          setErrorMessage("Wrong Password");

          navigate("/login");
        }
      }, 2000);
    }
  }, [error]);

  return (
    <>
      <div className="auth-page login-page">
        <div className="ctm-container">
          <h2 className="auth-page-heading">Anmeldung</h2>
          <div className="auth-page-wrap big-card">
            <div className="login-page-img">
              <img src="/assets/images/large-logo.png" alt="Large Logo" />
            </div>
            <div className="auth-page-form">
              <form onSubmit={submitLoginform}>
                <div className="form-group">
                  <label htmlFor="email">Benutzername</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="E-Mailadresse"
                    onChange={loginHandleInput}
                    value={userLogin.email}
                  />
                  {error.email && <p className="error">{error.email}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Passwort</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Passwort"
                    onChange={loginHandleInput}
                    value={userLogin.password}
                  />
                  {error.password && <p className="error">{error.password}</p>}
                </div>
                <div className="login-page-forget">
                  <div className="ctm-checkbox">
                    <label
                      className="ctm-checkbox-container"
                      onClick={(e) => setRememberPass(e.target.checked)}
                    >
                      Merken
                      <input type="checkbox" />
                      <span className="ctm-checkbox-checkmark"></span>
                    </label>
                  </div>
                  {/* <button onClick={(e) => navigate("/forget-password")}>Passwort vergessen?</button> */}
                  <Link to="/forget-password">Passwort vergessen?</Link>
                </div>
                <button type="submit">Anmelden</button>
                {errorMessage && <p className="apiError">{errorMessage}</p>}
              </form>
              <p className="auth-form-text">
                Kein Benutzername?{" "}
                <Link to="/packages">Zur Produktübersicht</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
