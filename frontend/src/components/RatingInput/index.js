import { useEffect, useState } from 'react';
import './RatingInput.css'

const RatingInput = ({ rating, disabled, onChange }) => {
  const [activeRating, setActiveRating] = useState(0);
    // console.log(activeRating)
  useEffect(() => {
    setActiveRating(rating);
  }, [rating]);
  // NOTE: This useEffect isn't necessary to have for this scenario, but if you
  // have a scenario which requires this input to be re-rendered with an updated
  // rating prop instead of unmounted and remounted with an updated rating, then
  // this useEffect is necessary.

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
// import { useEffect, useState } from 'react';

// const RatingInput = ({ rating, disabled, onChange }) => {
//   const [activeRating, setActiveRating] = useState(rating);

//   useEffect(() => {
//     setActiveRating(rating);
//   }, [rating]);
//   // NOTE: This useEffect isn't necessary to have for this scenario, but if you
//   // have a scenario which requires this input to be re-rendered with an updated
//   // rating prop instead of unmounted and remounted with an updated rating, then
//   // this useEffect is necessary.

//   const Icon = (number) => {
//     const props = {};
//     if (!disabled) {
//       props.onMouseEnter = () => setActiveRating(number);
//       props.onMouseLeave = () => setActiveRating(rating);
//       props.onClick = () => onChange(number);
//     }
//     return (
//       <div key={number} className={activeRating >= number ? "filled" : "empty"} {...props}>
//         <i className="fa fa-star"></i>
//       </div>
//     );
//   };

//   return (
//     <div className="rating-input">
//       {[1, 2, 3, 4, 5].map(number => Icon(number))}
//     </div>
//   );
// };

export default RatingInput;
