import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, Redirect } from 'react-router-dom';
import { deleteSpotThunk } from "../../store/spots";
import { useModal } from "../../context/Modal";

const DeleteSpotModal = ({ spot }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const [deleted, setDeleted] = useState(false)
  const deleteSpot = (spot) => {
    dispatch(deleteSpotThunk(spot))
    // history.push('/')
    // history.push('/spots/current')
  }


  return (
    <div className="form-page">
      <h1>Confirm Delete</h1>
        <button className="yes-delete" onClick={() => deleteSpot(spot)}>Delete</button>
        <button className="no-delete" onClick={closeModal}>Dont Delete</button>
    </div>
  );
}

export default DeleteSpotModal;
