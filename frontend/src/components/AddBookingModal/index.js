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
  const [complete, setComplete] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!endDate || !startDate) {
      setErrors({ message: "Must select start and end dates" });
      return;
    }

    const addBookingRes = await dispatch(
      addBookingThunk({ startDate, endDate }, spot.id)
    ).catch(async (res) => {
      const data = await res.json();
      return data;
    });
    if (addBookingRes.message) return setErrors(addBookingRes);
    await dispatch(getBookingsThunk(spot.id));
    // dispatch(getSpotsThunk())
    await dispatch(getOneSpotThunk(spot.id));
    setComplete(true);
    setTimeout(() => {
      closeModal();
    }, 1000)
  };
  return (
    <div className="form-page">
      {(!complete ? <>
        <h1 className="booking-h1">When would you like to stay?</h1>
      <form
        onSubmit={(e) => {
          setBooking({ startDate, endDate });
          handleSubmit(e);
        }}
        className="booking-form"
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
      </> : <i className="fas fa-check booking-complete"></i>)}
    </div>
  );
};

export default AddBookingModal;
