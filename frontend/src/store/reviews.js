import { csrfFetch } from "./csrf";

export const LOAD_REVIEWS = 'spots/LOAD_REVIEWS';
export const RECEIVE_REVIEW = 'spots/RECEIVE_REVIEW';
export const REMOVE_REVIEW = 'spots/REMOVE_REVIEW';

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews,
  });

export const receiveReview = (review) => ({
    type: RECEIVE_REVIEW,
    review,
  });

  export const removeReview = (id) => ({
  type: REMOVE_REVIEW,
  id,
});

  export const getReviewsThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
      const reviews = await response.json();
      dispatch(loadReviews(reviews))
      return reviews;
    }
  }

  export const addReviewThunk = (review, rating, spotId) => async dispatch => {
    try {
      const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({review, stars: parseInt(rating)})
      });

      if (response.ok) {
        const review = await response.json();
        dispatch(receiveReview(review))
        return review;
      }
    } catch (err) {
      return err.json()
    }
  }

  export const removeReviewThunk = (id) => async dispatch => {
    try {
      const response = await csrfFetch(`/api/reviews/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
      });

      if (response.ok) {
        const message = await response.json();
        dispatch(removeReview(id))
        return message;
      }
    } catch (err) {
      return err.json()
    }
  }

  const reviewsReducer = (state = {}, action) => {
    switch (action.type) {
      case LOAD_REVIEWS: {
        const newState = {};
        action.reviews.forEach((review) => {
          newState[review.id] = review;
        });
        return newState;
      }
      case RECEIVE_REVIEW: {
        const newState = {...state}
        newState[action.review.id] = action.review;
        // newState[action.review.id].User.firstName = action.review;
        return { ...state, [action.review.id]: action.review };
      }
      case REMOVE_REVIEW:
        const newState = { ...state };
        delete newState[action.id];
        return newState;
      default:
        return state;
    }
  };

  export default reviewsReducer;
