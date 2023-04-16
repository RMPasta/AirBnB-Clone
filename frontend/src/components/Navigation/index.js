import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import logo from "../../assets/logo.jpg";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="nav-ul">
      <li className="home-logo">
        <NavLink exact to="/" style={{ textDecoration: 'none' }}>
          <div className="logo-container">
            <img src={logo} alt="logo" className="logo" />
          </div>
        </NavLink>
      </li>
      <div className="nav-right">
        {sessionUser && <NavLink to="/spots/new" style={{ textDecoration: 'none' }}>Create a New Spot</NavLink>}
        {isLoaded && (
          <li className="dropdown-container">
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
    </ul>
  );
}

export default Navigation;
