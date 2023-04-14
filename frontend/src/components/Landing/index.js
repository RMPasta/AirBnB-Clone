import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSpotsThunk } from "../../store/spots";
import { nanoid } from "nanoid";
import "./Landing.css";

export default function Landing() {
  const dispatch = useDispatch();
  const history = useHistory();
  const spotsObj = useSelector((state) => state.spots); // populate from Redux store
  const spots = Object.values(spotsObj);

  const handleClick = (spot) => {
    history.push(`/spots/${spot.id}`);
  };

  useEffect(() => {
    dispatch(getSpotsThunk());
  }, [dispatch]);

  return (
    <div className="page">
      {spots &&
        spots
          .map((spot) => (
            <li key={nanoid(5)} className="spot-card">
              <div className="clickable" onClick={() => handleClick(spot)}>
                <div className="tool-tip">{spot && spot.name}</div>
                <img
                  src={spot && spot.previewImage}
                  alt={spot && spot.description}
                  className="previewImageLanding"
                />
                <div className="name-rating-container">
                  <p>
                    {spot && spot.city}, {spot && spot.state}
                  </p>
                  <div className="rating">
                    {spot && (
                      <p className="avgRating">
                        {spot.avgRating > 0 ? spot.avgRating : "New"}
                      </p>
                    )}
                    <i className="fas fa-star"></i>
                  </div>
                </div>
                <div className="price">
                  <p>${spot && spot.price} night</p>
                </div>
              </div>
            </li>
          ))
          .reverse()}
    </div>
  );
}
