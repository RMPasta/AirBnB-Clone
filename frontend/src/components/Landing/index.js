import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from '../../store/spots';

export default function Landing() {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state=>state.spots); // populate from Redux store
    const spots = Object.values(spotsObj);
    useEffect(() => {
        dispatch(getSpots())
      }, [dispatch])
  return (
    <div>
          {spots && spots.map((spot) => (
         <li key={spot.id}>
            <img src={spot.previewImage} alt={spot.description} />
            <h1>{spot.name}</h1>
         </li>
        ))}
    </div>
  )
}
