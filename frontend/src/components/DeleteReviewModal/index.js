import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeReviewThunk } from '../../store/reviews';
import { getOneSpotThunk }  from '../../store/spots';
import { getReviewsThunk } from '../../store/reviews';
import './DeleteReviewModal.css'

const DeleteReviewModal = ({ spot }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const reviews = useSelector(state=>Object.values(state.reviews));
  const sessionUser = useSelector(state=>state.session.user);

useEffect(() => {
    dispatch(getReviewsThunk(spot.id))
    dispatch(getOneSpotThunk(spot.id))
}, [dispatch, spot.id])

let usersReview;
useEffect(() => {
    reviews.forEach((review) => {
      if (review.User && review.User.id === parseInt(sessionUser.id)) {
        usersReview = review;
      }
    })
  }, [reviews])

const deleteReview = async () => {
    await dispatch(removeReviewThunk(usersReview.id))
    await dispatch(getReviewsThunk(spot.id))
    await dispatch(getOneSpotThunk(spot.id))
    closeModal();
  }


  return (
    <div className="form-page">
      <h1>Confirm Delete</h1>
      <h3>Are you sure you want to delete this review?</h3>
        <button className="yes-delete delete-button" onClick={() => deleteReview(spot)}>Yes (Delete Review)</button>
        <button className="no-delete" onClick={closeModal}>No (Keep Review)</button>
    </div>
  );
}

export default DeleteReviewModal;
