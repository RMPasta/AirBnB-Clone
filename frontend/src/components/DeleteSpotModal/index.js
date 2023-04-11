import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";

const DeleteSpotModal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    dispatch({})
    .then(closeModal)
  }

  return (
    <div className="form-page">
      <h1>Confirm Delete</h1>
        <button className="yes-delete">Delete</button>
        <button className="no-delete">Dont Delete</button>
    </div>
  );
}

export default DeleteSpotModal;
