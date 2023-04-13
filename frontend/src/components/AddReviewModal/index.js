import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addReviewThunk } from "../../store/reviews";
import { getReviewsThunk } from '../../store/reviews';
import { getOneSpotThunk } from '../../store/spots';
import { getSpotsThunk } from '../../store/spots';
import { useModal } from "../../context/Modal";
import RatingInput from "../RatingInput";
import './AddReviewModal.css';

const AddReviewModal = ({ spot }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState();
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (review && review.length > 10 && rating > 0) setDisabled(false)
  }, [review, rating])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addReviewRes = await dispatch(addReviewThunk(review, rating, spot.id))
    .catch(async (res) => {
      const data = await res.json();
      return data;
    })
    if (addReviewRes.message) setErrors(addReviewRes);
    await dispatch(getReviewsThunk(spot.id))
    // dispatch(getSpotsThunk())
    await dispatch(getOneSpotThunk(spot.id))
    if (!addReviewRes.message) closeModal();
  }
  const onChange = (number) => setRating(parseInt(number))
  return (
    <div className="form-page">
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit}>
      <div className="error-container">
        { errors && <p>{errors.message}</p> }
      </div>
        <textarea type="text" placeholder="Leave your review here..." className="textarea" onChange={(e) => setReview(e.target.value)}/>
        <div className="new-rating-stars">
            <RatingInput
            rating={rating}
            onChange={onChange}  />
            <p>Stars</p>
        </div>
        <button disabled={disabled} className="review-submit">Submit Your Review</button>
      </form>
    </div>
  );
}

export default AddReviewModal;
