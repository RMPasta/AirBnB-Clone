import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

const LoginFormModal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch(sessionActions.login({ credential, password }))
    .then(closeModal)
    .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) {
            setErrors(data.errors);
            setPassword('')
        }
      }
      );
      history.push('/')
    };

    const demoSubmit = () => {
      const user = {credential: "DemoUser", password: "password"}
      dispatch(sessionActions.login(user))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
            setPassword('')
          }
        }
        );
        closeModal();
      };

  useEffect(() => {
    if (credential.length >= 4 && password.length >= 6) {
      setDisabled(false)
    }
  }, [credential, password])
  return (
    <div className="form-page">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={credential}
            placeholder="Username/Email"
            className="username-email"
            onChange={(e) => setCredential(e.target.value)}
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <div className="error-container">
        {errors.credential && <p>{errors.credential}</p>}
        </div>
        <button type="submit" disabled={disabled} className="login-button">Log In</button>
        <button onClick={() => demoSubmit()} className="demo-button">Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
