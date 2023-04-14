import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import { getSpotsThunk } from '../../store/spots';
import { nanoid } from 'nanoid';
import './ManageSpots.css';
import DeleteSpotModal from '../DeleteSpotModal';

export default function ManageSpots() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state=>state.session.user); // populate from Redux store
    const spotsObj = useSelector(state=>state.spots); // populate from Redux store
    const spots = Object.values(spotsObj)

    const handleClick = (spot) => {
      history.push(`/spots/${spot.id}`)
    }

    const handleUpdate = (spot) => {
      history.push(`/spots/${spot.id}/edit`)
    }

    useEffect(() => {
      dispatch(getSpotsThunk())
    }, [dispatch])
    if (!spots) return <div>...Loading</div>
    const ownedSpots = spots.filter(spot => spot.ownerId === sessionUser.id);


  return (
      <div className="manage-page">
        <h1>Manage Your Spots</h1>
        { !ownedSpots.length && <NavLink to="/spots/new"><button className='manage-spots-create'>Create a New Spot</button></NavLink> }
        <div className='page'>
          {ownedSpots && ownedSpots.map((spot) => (
         <li key={nanoid(5)} className="spot-card">
            <div className="clickable" onClick={() => handleClick(spot)}>
          {/* <div className='tool-tip'>{spot && spot.name}</div> */}
            <img src={spot && spot.previewImage} alt={spot && spot.description} className="previewImageLanding" />
            <div className="name-rating-container">
              <p>{spot && spot.city}, {spot && spot.state}</p>
              <div className="rating">
                { spot && <p className="avgRating">{spot.avgRating > 0 ? spot.avgRating : "New"}</p> }
                <i className="fas fa-star"></i>
              </div>
            </div>
            <div className="price">
            <p>${spot && spot.price} night</p>
            </div>
            </div>
            <div className='manage-buttons'>
                <button className='update-button' onClick={() => handleUpdate(spot)}>Update</button>
                <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteSpotModal spot={spot} />}
              />
            </div>
         </li>
        )).reverse()}
        </div>
    </div>
  )
}
