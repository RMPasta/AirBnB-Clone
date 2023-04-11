import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className="nav-ul">
      <li className="home-logo">
        <NavLink exact to="/">Home</NavLink>
      </li>
      <div className='nav-right'>
        {sessionUser && <NavLink to="/spots/new">Create a New Spot</NavLink>}
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
