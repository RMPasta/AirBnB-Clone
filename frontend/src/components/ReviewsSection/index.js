import React, { useState, useEffect } from 'react';
import OpenModalButton from '../OpenModalButton';
import AddReviewModal from '../AddReviewModal';
import DeleteReviewModal from '../DeleteReviewModal';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import './ReviewsSection.css'

export default function ReviewsSection({ spot, reviews}) {
    const [reviewed, setReviewed] = useState(false);
    const sessionUser = useSelector(state=>state.session.user);

    useEffect(() => {
      setReviewed(false)
      reviews.forEach((review) => {
        if (review.User && sessionUser && review.User.id === parseInt(sessionUser.id)) {
          setReviewed(true);
        }
      })
    }, [reviews, sessionUser])

    if (!spot) return <div>...Loading</div>
    if (!reviews) return <div>...Loading</div>

    const sortedReviews = reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    const months = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
    };

  return (
    <div className='spot-reviews'>
    <div className='rating-reviews-section'>
          {spot.avgStarRating && <p>{spot.numReviews} {spot.numReviews > 1 ? "reviews" : "review"}</p>}
            <div className='rating'>
              <p className="avgRating">{spot.avgStarRating ? spot.avgStarRating + " · " : "New"}</p>
              <i className="fas fa-star"></i>
            </div>
          </div>
          {!reviewed && sessionUser && spot.ownerId !== parseInt(sessionUser.id) && <OpenModalButton
          buttonText="Add Review"
          className="add-review-button"
          modalComponent={<AddReviewModal spot={spot} />} /> }
          {reviews.length < 1 && sessionUser && spot.ownerId !== parseInt(sessionUser.id) && <p className='be-the-first'>Be the first to post a review!</p>}

      {sortedReviews && sortedReviews.map((review) => {
        return <li key={nanoid(5)}  className='review'>
          <div className='review-name'>{review.User ? review.User.firstName : sessionUser.firstName}</div>
          <div className='review-date'>{months[review.createdAt.split('T')[0].slice(0, 7).split('-')[1]] + ' ' + review.createdAt.split('T')[0].slice(0, 7).split('-')[0]}</div>
          <div>{review.review}</div>
          { review.User && sessionUser && review.User.id === parseInt(sessionUser.id) && <OpenModalButton
          className="delete-review-button"
          buttonText="Delete Review"
          modalComponent={<DeleteReviewModal spot={spot} />} /> }
        </li>
      })}
    </div>
  )
}
