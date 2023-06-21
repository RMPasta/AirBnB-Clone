import React from "react";
import { useDispatch } from "react-redux";
import { removeBookingThunk } from "../../store/bookings";
import { useModal } from "../../context/Modal";
import '../DeleteReviewModal/DeleteReviewModal.css'

const DeleteBookingModal = ({ booking }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const deleteBooking = (booking) => {
    dispatch(removeBookingThunk(booking.id))
    .then(closeModal())
  }


  return (
    <div className="form-page">
      <h1>Confirm Delete</h1>
        <button className="yes-delete" onClick={() => deleteBooking(booking)}>Yes (Delete Booking)</button>
        <button className="no-delete" onClick={closeModal}>No (Keep Booking)</button>
    </div>
  );
}

export default DeleteBookingModal;
