import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import bed from '../../assets/bed.jpg';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className="nav-ul">
      <li className="home-logo">
        <NavLink exact to="/"><img src={bed} alt="bed" className='bed' /><h2 className='logo-h1'>CoolBnB</h2></NavLink>
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
