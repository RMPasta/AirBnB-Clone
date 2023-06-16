import { csrfFetch } from "./csrf";

export const LOAD_BOOKINGS = "spots/LOAD_BOOKINGS";
export const RECEIVE_BOOKING = "spots/RECEIVE_BOOKING";
export const REMOVE_BOOKING = "spots/REMOVE_BOOKING";

export const loadBookings = (bookings) => ({
  type: LOAD_BOOKINGS,
  bookings,
});

export const receiveBooking = (booking) => ({
  type: RECEIVE_BOOKING,
  booking,
});

export const removeBooking = (id) => ({
  type: REMOVE_BOOKING,
  id,
});

export const getBookingsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

  if (response.ok) {
    const bookings = await response.json();
    dispatch(loadBookings(bookings));
    return bookings;
  }
};

export const addBookingThunk = (booking, spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    });

    if (response.ok) {
      const booking = await response.json();
      dispatch(receiveBooking(booking));
      return booking;
    }
  } catch (err) {
    return err.json();
  }
};

export const removeBookingThunk = (id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/bookings/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const message = await response.json();
      dispatch(removeBooking(id));
      return message;
    }
  } catch (err) {
    return err.json();
  }
};

const bookingsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_BOOKINGS: {
      const newState = {};
      action.bookings.Bookings.forEach((booking) => {
        newState[booking.id] = booking;
      });
      return newState;
    }
    case RECEIVE_BOOKING: {
      const newState = { ...state };
      newState[action.booking.id] = action.booking;
      return { ...state, [action.booking.id]: action.booking };
    }
    case REMOVE_BOOKING:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default bookingsReducer;
