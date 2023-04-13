import { useEffect, useState } from 'react';
import './RatingInput.css'

const RatingInput = ({ rating, disabled, onChange }) => {
  const [activeRating, setActiveRating] = useState(rating);

  useEffect(() => {
    setActiveRating(rating);
  }, [rating]);

  return (
    <div className="rating-input">
    <div
      onMouseEnter={() => {if (!disabled) setActiveRating(1)}}
      onMouseLeave={() => {if (!disabled) setActiveRating(rating)}}
      onClick={() => {if (!disabled) onChange(1)}} >
      <i className={activeRating >= 1 ? "fa fa-star" : "fa-regular fa-star"}></i>
    </div>
    <div
      onMouseEnter={() => {if (!disabled) setActiveRating(2)}}
      onMouseLeave={() => {if (!disabled) setActiveRating(rating)}}
      onClick={() => {if (!disabled) onChange(2)}} >
     <i className={activeRating >= 2 ? "fa fa-star" : "fa-regular fa-star"}></i>
    </div>
    <div
      onMouseEnter={() => {if (!disabled) setActiveRating(3)}}
      onMouseLeave={() => {if (!disabled) setActiveRating(rating)}}
      onClick={() => {if (!disabled) onChange(3)}} >
      <i className={activeRating >= 3 ? "fa fa-star" : "fa-regular fa-star"}></i>
    </div>
    <div
      onMouseEnter={() => {if (!disabled) setActiveRating(4)}}
      onMouseLeave={() => {if (!disabled) setActiveRating(rating)}}
      onClick={() => {if (!disabled) onChange(4)}} >
      <i className={activeRating >= 4 ? "fa fa-star" : "fa-regular fa-star"}></i>
    </div>
    <div
      onMouseEnter={() => {if (!disabled) setActiveRating(5)}}
      onMouseLeave={() => {if (!disabled) setActiveRating(rating)}}
      onClick={() => {if (!disabled) onChange(5)}} >
      <i className={activeRating >= 5 ? "fa fa-star" : "fa-regular fa-star"}></i>
    </div>
  </div>
  );
};

export default RatingInput;
