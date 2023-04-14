import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import bed from "../../assets/bed.jpg";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="nav-ul">
      <li className="home-logo">
        <NavLink exact to="/" style={{ textDecoration: 'none' }}>
          <div className="logo-container">
            <img src={bed} alt="bed" className="bed" />
            <h1 className="logo-h1">CoolBnB</h1>
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
