import React, { useState, useEffect } from "react";
import "../style.css";
import { useNavigate, useParams } from "react-router-dom";
const API = process.env.REACT_APP_API_BASE_URL;

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [resetPass, setResetPass] = useState({
    password: "",
    repeatPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const resetPassHandleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setResetPass({ ...resetPass, [name]: value });
  };
  const submitResetform = (e) => {
    e.preventDefault();
    setError(validation(resetPass));
    setIsSubmit(true);
  };
  // Register form validation
  function validation(values) {
    let errors = {};
    if (!values.password) {
      errors.password = "Passwort is required";
    } else if (values.password.length < 8) {
      errors.password = "Passwort must be 8 or more characters";
    }
    if (!values.repeatPassword) {
      errors.repeatPassword = "Passwort wiederholen is required";
    } else if (values.password != values.repeatPassword) {
      errors.repeatPassword = "Passwort not matched";
    }
    return errors;
  }
  async function resetApi() {
    try {
      let resp = await fetch(`${API}/change-password/${token}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: resetPass.password }),
      });

      navigate("/login");
    } catch (error) {
      console.log("error", error);
    }
  }
  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      resetApi();
    }
  }, [error]);
  return (
    <>
      <div className="auth-page login-page">
        <div className="ctm-container">
          <h2 className="auth-page-heading">Reset Passwort</h2>
          <div className="auth-page-wrap big-card">
            <div className="login-page-img">
              <img src="/assets/images/large-logo.png" alt="Large Logo" />
            </div>
            <div className="auth-page-form">
              <form>
                <div className="form-group">
                  <label htmlFor="password">Passwort</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Passwort"
                    onChange={resetPassHandleInput}
                    value={resetPass.password}
                  />
                  {error.password && <p className="error">{error.password}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="repeatPassword">Passwort wiederholen</label>
                  <input
                    type="password"
                    name="repeatPassword"
                    id="repeatPassword"
                    className="form-control"
                    placeholder="Passwort"
                    onChange={resetPassHandleInput}
                    value={resetPass.repeatPassword}
                  />
                  {error.repeatPassword && (
                    <p className="error">{error.repeatPassword}</p>
                  )}
                </div>
                <button type="submit" onClick={submitResetform}>
                  Reset Passwort
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
