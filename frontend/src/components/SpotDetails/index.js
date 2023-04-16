import React from 'react';
import { useSelector } from 'react-redux';
import ReviewsSection from '../ReviewsSection';
import { nanoid } from 'nanoid';
import './SpotDetails.css';


export default function SpotDetails() {
  const spot = useSelector(state=>state.spots.spot);
  const reviews = useSelector(state=>Object.values(state.reviews));

  if (!spot) return <div>...Loading</div>

  return (
    <div className='spot-details-page'>
        <h1>{spot.name}</h1>
        <div>{spot.city}, {spot.state}, {spot.country}</div>
        {spot.previewImage && <img src={spot.previewImage} alt={spot.name} /> }
        <div className='spot-images-container'>
          {spot.SpotImages && spot.SpotImages.map((image, i) => {
            return <img key={nanoid(5)} src={image.url} alt={spot.name} className={image.preview ? `previewImage` : `spotImage spotImage-${i}`} />
          })}
        </div>
        <div className='spot-info'>
          <div className='reserve-container'>
            {spot.Owner && <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2> }
            <p>{spot.description}</p>
          </div>
          <div className='stat-block'>
            <div className="top-stats">
              <p className='detail-price'>${spot.price} night</p>
                <div className='rating'>
                {spot.avgStarRating && <p>{spot.numReviews} {spot.numReviews > 1 ? "reviews" : "review"}</p> }
                  <p className="avgRating">{spot.avgStarRating ? spot.avgStarRating + " · " : "New"}</p>
                  <i className="fas fa-star"></i>
                </div>
            </div>
            <div>
              <button className='reserve-button' onClick={() => alert("Feature Coming Soon...")}>Reserve</button>
            </div>
          </div>
        </div>
        <ReviewsSection spot={spot} reviews={reviews} />
    </div>
  )
}
