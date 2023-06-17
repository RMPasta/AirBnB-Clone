import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOneSpotThunk } from "../../store/spots";
import { useModal } from "../../context/Modal";
import {
  getBookingsThunk,
  addBookingThunk,
  updateBookingThunk,
} from "../../store/bookings";
// import "./AddBookingModal.css";

const UpdateBookingModal = ({ spot, booking }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!endDate || !startDate) {
      setErrors({ message: "Must select start and end dates" });
      return;
    }

    const editBookingRes = await dispatch(
      updateBookingThunk({ startDate, endDate }, booking.id)
    ).catch(async (res) => {
      const data = await res.json();
      return data;
    });
    if (editBookingRes.message) return setErrors(editBookingRes);
    await dispatch(getBookingsThunk(spot.id));
    // dispatch(getSpotsThunk())
    await dispatch(getOneSpotThunk(spot.id));
    closeModal();
  };
  return (
    <div className="form-page">
      <h1>When would you like to stay?</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="error-container">
          {errors && <p>{errors.message}</p>}
        </div>
        <input
          type="date"
          placeholder="starting date..."
          className="start-input"
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="ending date..."
          className="end-input"
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button className="booking-submit">Submit Your Booking</button>
      </form>
    </div>
  );
};

export default UpdateBookingModal;
