import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import UpdateBookingModal from "../UpdateBookingModal";
import DeleteBookingModal from "../DeleteBookingModal";

export default function BookingsSection() {
    const spot = useSelector((state) => state.spots.spot);
    const bookings = useSelector((state) => Object.values(state.bookings));
    const reviews = useSelector((state) => Object.values(state.reviews));
    const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="bookings-container">
        {bookings.length &&
          bookings.map((booking) => {
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

            if (booking.message) return <></>;
            return (
              <div className="booking-card" key={booking.id}>
                <div className="first-name">{booking.User?.firstName}:</div>
                <div>
                  {booking.userId === sessionUser?.id ? (
                    <OpenModalButton
                      className="fas fa-edit booking-icon"
                      buttonText=""
                      modalComponent={
                        <UpdateBookingModal spot={spot} booking={booking} />
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
                {booking.userId === sessionUser.id ? <OpenModalButton
                className="fas fa-trash booking-icon"
                buttonText=""
                modalComponent={<DeleteBookingModal booking={booking} />} /> : <></>}
              </div>
            );
          })}
      </div>
  )
}
