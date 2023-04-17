import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const { closeModal } = useModal();

  useEffect(() => {
    if (email && username && firstName && lastName && password && confirmPassword) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [email, username, firstName, lastName, password, confirmPassword]);

  useEffect(() => {
    if (username.length < 4 || password.length < 6) {
      setDisabled(true)
    }
  }, [username, password])

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className="form-page">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <div className="error-container">
        {errors.email && <p>{errors.email}</p>}
        </div>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        <div className="error-container">
        {errors.username && <p>{errors.username}</p>}
        </div>
          <input
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        <div className="error-container">
        {errors.firstName && <p>{errors.firstName}</p>}
        </div>
          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        <div className="error-container">
        {errors.lastName && <p>{errors.lastName}</p>}
        </div>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <div className="error-container">
        {errors.password && <p>{errors.password}</p>}
        </div>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        <div className="error-container">
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <button disabled={disabled} type="submit" className="submit-signup">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
