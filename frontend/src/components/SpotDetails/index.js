import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReviewsSection from "../ReviewsSection";
import OpenModalButton from "../OpenModalButton";
import { nanoid } from "nanoid";
import { getBookingsThunk } from "../../store/bookings";
import AddBookingModal from "../AddBookingModal";
import UpdateBookingModal from "../UpdateBookingModal";
import "./SpotDetails.css";

export default function SpotDetails() {
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots.spot);
  const bookings = useSelector((state) => Object.values(state.bookings));
  const reviews = useSelector((state) => Object.values(state.reviews));
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getBookingsThunk(spot.id));
  }, [dispatch]);

  if (!spot) return <div>...Loading</div>;
  return (
    <div className="spot-details-page">
      <h1>{spot.name}</h1>
      <div>
        {spot.city}, {spot.state}, {spot.country}
      </div>
      {spot.previewImage && <img src={spot.previewImage} alt={spot.name} />}
      <div className="spot-images-container">
        {spot.SpotImages &&
          spot.SpotImages.map((image, i) => {
            return (
              <img
                key={nanoid(5)}
                src={image.url}
                alt={spot.name}
                className={
                  image.preview ? `previewImage` : `spotImage spotImage-${i}`
                }
              />
            );
          })}
      </div>
      <div className="spot-info">
        <div className="reserve-container">
          {spot.Owner && (
            <h2>
              Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
            </h2>
          )}
          <p>{spot.description}</p>
        </div>
        <div className="stat-block">
          <div className="top-stats">
            <p className="detail-price">${spot.price} night</p>
            <div className="rating">
              {spot.avgStarRating && (
                <p>
                  {spot.numReviews} {spot.numReviews > 1 ? "reviews" : "review"}
                </p>
              )}
              <p className="avgRating">
                {spot.avgStarRating ? spot.avgStarRating + " · " : "New"}
              </p>
              <i className="fas fa-star"></i>
            </div>
          </div>
          <div>
            {sessionUser && spot.ownerId !== parseInt(sessionUser?.id) && (
              <OpenModalButton
                buttonText="Reserve"
                modalComponent={<AddBookingModal spot={spot} />}
              />
            )}
          </div>
        </div>
      </div>
      <ReviewsSection spot={spot} reviews={reviews} />
      <h2>Reservations</h2>
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
                      buttonText="Edit"
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
              </div>
            );
          })}
      </div>
    </div>
  );
}
