import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { UserIcon } from "../FontAwesome";

function ProfileButton({ user }) {
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button>
        <UserIcon />
      </button>
      <ul className="profile-dropdown">
        <li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button className="logout-button" onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
