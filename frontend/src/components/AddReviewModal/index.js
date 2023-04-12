import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import RatingInput from "../RatingInput";

const AddReviewModal = ({ spot }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState();
  const [rating, setRating] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [activeRating, setActiveRating] = useState(1);
    console.log(review)
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addReviewThunk(review))
    .then(closeModal())
  }

  const onChange = (number) => setRating(parseInt(number))

  return (
    <div className="form-page">
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit}>
        <textarea type="text" />
        <div className="new-rating-stars">
            <RatingInput
            disabled={false}
            rating={rating}
            onChange={onChange}  />
            <p>Stars</p>
        </div>
        <button className="review-submit">Submit Your Review</button>
      </form>
    </div>
  );
}

export default AddReviewModal;
