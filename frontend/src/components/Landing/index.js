import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from '../../store/spots';
import './Landing.css';

export default function Landing() {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state=>state.spots); // populate from Redux store
    const spots = Object.values(spotsObj);
    useEffect(() => {
        dispatch(getSpots())
      }, [dispatch])
  return (
    <div className="page">
          {spots && spots.map((spot) => (
         <li key={spot.id}>
            <img src={spot.previewImage} alt={spot.description} className="previewImage" />
            <h1>{spot.name}</h1>
         </li>
        ))}
    </div>
  )
}
