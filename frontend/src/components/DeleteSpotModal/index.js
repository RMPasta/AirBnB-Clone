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
        <button className="yes-delete" onClick={() => deleteSpot(spot)}>Yes (Delete Spot)</button>
        <button className="no-delete" onClick={closeModal}>No (Keep Spot)</button>
    </div>
  );
}

export default DeleteSpotModal;
