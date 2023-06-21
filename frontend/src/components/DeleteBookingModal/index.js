import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeBookingThunk } from "../../store/bookings";
import { useModal } from "../../context/Modal";
import '../DeleteReviewModal/DeleteReviewModal.css'

const DeleteBookingModal = ({ booking }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errors, setErrors] = useState("");

  const deleteBooking = async (booking) => {
    let currentDate = new Date();
    currentDate = currentDate.toJSON().split("T")[0];
    let bookingStartDate = booking.startDate;
    if (bookingStartDate <= currentDate) return setErrors("Bookings that have been started can't be deleted")
    await dispatch(removeBookingThunk(booking.id))
    closeModal();
  }

  return (
    <div className="form-page">
      {errors && <p>{errors}</p>}
      <h1>Confirm Delete</h1>
        <button className="yes-delete" onClick={() => deleteBooking(booking)}>Yes (Delete Booking)</button>
        <button className="no-delete" onClick={closeModal}>No (Keep Booking)</button>
    </div>
  );
}

export default DeleteBookingModal;
