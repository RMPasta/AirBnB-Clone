import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSpots } from '../../store/spots';
import './Landing.css';

export default function Landing() {
    const dispatch = useDispatch();
    const history = useHistory();
    const spotsObj = useSelector(state=>state.spots); // populate from Redux store
    const spots = Object.values(spotsObj);

    const handleClick = (spot) => {
      history.push(`/spots/${spot.id}`)
    }

    useEffect(() => {
        dispatch(getSpots())
      }, [dispatch])
  return (
    <div className="page">
          {spots && spots.map((spot) => (
         <li key={spot.id} className="spot-card" onClick={() => handleClick(spot)}>
            <img src={spot.previewImage} alt={spot.description} className="previewImage" />
            <div className="name-rating-container">
              <p>{spot.city}, {spot.state}</p>
              <div className="rating">
                <p className="avgRating">{spot.avgRating}</p>
                <i className="fas fa-star"></i>
              </div>
            </div>
            <div className="price">
            <p>${spot.price} night</p>
            </div>
            {/* <h4>{spot.id}</h4> */}
         </li>
        ))}
    </div>
  )
}
