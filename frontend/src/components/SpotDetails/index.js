import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import { nanoid } from 'nanoid';
import './SpotDetails.css';
import AddReviewModal from '../AddReviewModal';
import DeleteReviewModal from '../DeleteReviewModal';

export default function SpotDetails() {
  const spot = useSelector(state=>state.spots.spot);
  const reviews = useSelector(state=>Object.values(state.reviews));
  const sessionUser = useSelector(state=>state.session.user);
  const dispatch = useDispatch();
  const [reviewed, setReviewed] = useState();
  let usersReview;
  useEffect(() => {
    setReviewed(false)
    reviews.forEach((review) => {
      if (review.User && sessionUser && review.User.id === parseInt(sessionUser.id)) {
        usersReview = review;
        setReviewed(true);
      }
    })
  }, [reviews])
  if (!spot) return <div>...Loading</div>
  if (!reviews) return <div>...Loading</div>




  return (
    <div className='spot-details-page'>
        { spot && <h1>{spot.name}</h1> }
        { spot && <div>{spot.city}, {spot.state}, {spot.country}</div> }
        {spot && <img src={spot.previewImage} alt={spot.name} /> }
        <div className='spot-images-container'>
          {spot && spot.SpotImages && spot.SpotImages.map(image => {
            return <img key={nanoid(5)} src={image.url} alt={spot.name} className={image.preview ? "previewImage" : "spotImage"} />
          })}
        </div>
        <div className='spot-info'>
          <div>
            {spot.Owner && <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2> }
            {spot && <p>{spot.description}</p>}
          </div>
          <div className='stat-block'>
            <div className="top-stats">
              {spot && <p className='detail-price'>${spot.price} night</p>}
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
        <div className='spot-reviews'>
          <div className='rating-reviews-section'>
                {spot.avgStarRating && <p>{spot.numReviews} {spot.numReviews > 1 ? "reviews" : "review"}</p>}
                  <div className='rating'>
                    <p className="avgRating">{spot.avgStarRating ? spot.avgStarRating + " · " : "New"}</p>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
                {!reviewed && <OpenModalButton
                buttonText="Add Review"
                modalComponent={<AddReviewModal spot={spot} />} /> }
                {reviews.length < 1 && <p>Be the first to post a review!</p>}
            {reviews && reviews.map(review => {
              return <li key={nanoid(5)}  className='review'>
                <div className='review-name'>{review.User ? review.User.firstName : sessionUser.firstName}</div>
                <div className='review-date'>{review.createdAt.split('T')[0].slice(0, 7).split('-')[1] + ' ' + review.createdAt.split('T')[0].slice(0, 7).split('-')[0]}</div>
                <div>{review.review}</div>
                { review.User && sessionUser && review.User.id === parseInt(sessionUser.id) && <OpenModalButton
                buttonText="Delete Review"
                modalComponent={<DeleteReviewModal spot={spot} />} /> }
              </li>
            }).reverse()}
          </div>
    </div>
  )
}
