import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

const LoginFormModal = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
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
  };

  const demoSubmit = () => {
    const user = {credential: "DemoUser", password: "password"}
    return dispatch(sessionActions.login(user))
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
  };

  return (
    <div className="form-page">
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
        <button className="demo-login" onClick={() => demoSubmit()}>Demo User</button>
    </div>
  );
}

export default LoginFormModal;
