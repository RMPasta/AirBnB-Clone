import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOneSpotThunk } from "../../store/spots";
import { useModal } from "../../context/Modal";
import { getBookingsThunk, addBookingThunk } from "../../store/bookings";
import "./AddBookingModal.css";

const AddBookingModal = ({ spot }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [booking, setBooking] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (booking && booking.length > 10 && rating > 0) setDisabled(false);
  }, [booking, rating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBooking({ startDate: startDate, endDate: endDate });
    const addBookingRes = await dispatch(
      addBookingThunk(booking, spot.id)
    ).catch(async (res) => {
      const data = await res.json();
      return data;
    });
    if (addBookingRes.message) setErrors(addBookingRes);
    await dispatch(getBookingsThunk(spot.id));
    // dispatch(getSpotsThunk())
    await dispatch(getOneSpotThunk(spot.id));
    closeModal();
  };
  return (
    <div className="form-page">
      <h1>When would like to stay?</h1>
      <form onSubmit={handleSubmit}>
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
        <button disabled={disabled} className="booking-submit">
          Submit Your Booking
        </button>
      </form>
    </div>
  );
};

export default AddBookingModal;
