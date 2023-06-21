import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton";
import UpdateBookingModal from "../UpdateBookingModal";
import DeleteBookingModal from "../DeleteBookingModal";
import { getUserBookingsThunk } from "../../store/bookings";
import { nanoid } from 'nanoid';
import "./UserBookings.css"

export default function UserBookings() {
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector((state) => state.spots.spot);
    const bookingsState = useSelector((state) => Object.values(state.bookings));
    const sessionUser = useSelector((state) => state.session.user);
    const bookings = bookingsState?.filter(booking => booking.userId == sessionUser.id)

    useEffect(() => {
        dispatch(getUserBookingsThunk());
      }, [dispatch]);

    if (!bookingsState) return <></>;
    if (!bookings) return <></>;
  return (
    <div className="bookings-container">
        {bookings.map((booking) => {
            // Convert start date to month, day, and year
            const startDateObj = new Date(booking.startDate);
            const startMonth = startDateObj.toLocaleString("en-US", {
              month: "long",
            });
            const startDay = startDateObj.getDate() + 1;
            const startYear = startDateObj.getFullYear();

            // Convert end date to month, day, and year
            const endDateObj = new Date(booking.endDate);
            const endMonth = endDateObj.toLocaleString("en-US", {
              month: "long",
            });
            const endDay = endDateObj.getDate() + 1;
            const endYear = endDateObj.getFullYear();

            if (booking.message) return <div key={nanoid(5)}></div>;
            if (!booking.Spot) return <div key={nanoid(5)}></div>;
            return (
              <div className="booking-card" key={nanoid(5)}>
                <div className="booking-spot-link" onClick={() => history.push(`/spots/${booking.Spot.id}`)}>{booking.Spot.name}</div>
                <div>
                  {booking.userId === sessionUser?.id ? (
                    <OpenModalButton
                      className="fas fa-edit"
                      buttonText=""
                      modalComponent={
                        <UpdateBookingModal spot={booking.Spot} booking={booking} />
                      }
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  {startMonth + " " + startDay + ", " + startYear} -{" "}
                  {endMonth + " " + endDay + ", " + endYear}
                </div>
                {booking.userId === sessionUser?.id ? <OpenModalButton
                className="fas fa-trash"
                buttonText=""
                modalComponent={<DeleteBookingModal booking={booking} />} /> : <></>}
              </div>
            );
          })}
      </div>
  )
}
