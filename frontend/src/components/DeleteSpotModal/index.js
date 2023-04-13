import React from "react";
import { useDispatch } from "react-redux";
import { deleteSpotThunk } from "../../store/spots";
import { useModal } from "../../context/Modal";

const DeleteSpotModal = ({ spot }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const deleteSpot = (spot) => {
    dispatch(deleteSpotThunk(spot))
    .then(closeModal())
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
