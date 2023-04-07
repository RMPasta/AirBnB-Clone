import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
            setErrors(data.errors);
            setPassword('')
        }
      }
    );
  };

  return (
    <div className="page">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username/Email:
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="error-container">
        {errors.credential && <p>{errors.credential}</p>}
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormPage;
