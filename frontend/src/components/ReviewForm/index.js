import { useState } from 'react';

import { useDispatch } from 'react-redux';
import PawsRatingInput from './PawsRatingInput';
import { addReviewThunk } from '../../store/reviews';

const ReviewForm = ({ review, closeForm }) => {
  const [rating, setRating] = useState(review.rating);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // IMPORTANT: Need to await this, otherwise the closeForm will happen first
    // and the review will get updated at the same time as closing form. the
    // review will not get updated after form is closed.
    await dispatch(addReviewThunk({ ...review, rating }));
    closeForm();
  };

  const onChange = (number) => {
    setRating(parseInt(number));
  };

  return (
    <form onSubmit={handleSubmit} >
      <PawsRatingInput
        disabled={false}
        onChange={onChange}
        rating={rating}
      />
      <input type="submit" value={formType} />
      <button onClick={closeForm}>Cancel</button>
    </form>
  );
}

export default ReviewForm;
