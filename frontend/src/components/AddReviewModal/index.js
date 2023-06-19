import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addReviewThunk } from "../../store/reviews";
import { getReviewsThunk } from '../../store/reviews';
import { getOneSpotThunk } from '../../store/spots';
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
    if (review && review?.length > 10 && rating > 0) setDisabled(false)
  }, [review, rating])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (review.length < 30)
    return setErrors({
      ...errors,
      review: "Review needs a minimum of 30 characters",
    });
    if (review.length > 600)
    return setErrors({
      ...errors,
      review: "Review needs to be less than 600 characters",
    });

    const addReviewRes = await dispatch(addReviewThunk(review, rating, spot.id))
    .catch(async (res) => {
      const data = await res.json();
      return data;
    })
    if (addReviewRes.message) setErrors(addReviewRes);
    await dispatch(getReviewsThunk(spot.id))
    // dispatch(getSpotsThunk())
    await dispatch(getOneSpotThunk(spot.id))
    closeModal();
  }
  const onChange = (number) => setRating(parseInt(number))
  const badData = {
    textArea: {
      color: "red"
    }
  }
  return (
    <div className="form-page">
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit}>
      <div className="error-container">
        { errors && <p>{errors.message}</p> }
      </div>
      {errors.review && <div style={{color: "red"}}>{errors.review}</div>}
      {review?.length < 30 || !review ?
        <div style={review?.length < 30 ? badData.textArea : {}}>{review?.length || 0} / 30</div> :
        <div style={review?.length > 600 ? badData.textArea : {}}>{review?.length || 0} / 600</div> }
        <textarea type="text" placeholder="Leave your review here..." className="textarea" onChange={(e) => setReview(e.target.value)}/>
        <div className="new-rating-stars">
            <RatingInput
            rating={rating}
            onChange={onChange}  />
        </div>
        <button disabled={disabled} className="review-submit">Submit Your Review</button>
      </form>
    </div>
  );
}

export default AddReviewModal;
