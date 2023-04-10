import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getOneSpotThunk } from '../../store/spots';
import { getReviewsThunk } from '../../store/reviews';
import './SpotDetails.css';

export default function SpotDetails() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const spot = useSelector(state=>state.spots);
  const reviews = useSelector(state=>Object.values(state.reviews));

  useEffect(() => {
    dispatch(getOneSpotThunk(spotId))
    dispatch(getReviewsThunk(spotId))
  }, [dispatch])
  console.log(reviews)

  return (<div className='spot-details-page'>
        { spot && <h1>{spot.name}</h1> }
        { spot && <div>{spot.city}, {spot.state}, {spot.country}</div> }
        {spot && <img src={spot.previewImage} alt={spot.name} /> }
        <div className='spot-images-container'>
          {spot && spot.SpotImages && spot.SpotImages.map(image => {
            return <img key={image.id} src={image.url} alt={spot.name} className={image.preview ? "previewImage" : "spotImage"} />
          })}
        </div>
        <div className='spot-info'>
          <div>
            {spot.Owner && <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2> }
            {spot && <p>{spot.description}</p>}
          </div>
          <div className='stat-block'>
            <div className="top-stats">
              {spot && <p className='price'>${spot.price} night</p>}
                <div className='rating'>
                <p>{spot.numReviews} reviews</p>
                  <p className="avgRating">{spot.avgStarRating}</p>
                  <i className="fas fa-star"></i>
                </div>
            </div>
            <div>
              <button className='reserve-button' onClick={() => alert("Feature Coming Soon...")}>Reserve</button>
            </div>
          </div>
        </div>
          <div className='spot-reviews'>
          <div className='rating-reviews-section'>
                <p>{spot.numReviews} reviews</p>
                  <div className='rating'>
                    <p className="avgRating">{spot.avgStarRating}</p>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
            {reviews && reviews.map(review => {
              return <li key={review.id}  className='review'>
                <div className='review-name'>{review.User.firstName}</div>
                <div className='review-date'>{review.createdAt.split('T')[0].slice(0, 7).split('-')[1] + ' ' + review.createdAt.split('T')[0].slice(0, 7).split('-')[0]}</div>
                <div>{review.review}</div>
              </li>
            })}
          </div>
    </div>
  )
}
