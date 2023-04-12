import { csrfFetch } from "./csrf";

export const LOAD_REVIEWS = 'spots/LOAD_REVIEWS';
export const RECEIVE_REVIEW = 'spots/RECEIVE_REVIEW';

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews,
  });

export const receiveReview = (review) => ({
    type: RECEIVE_REVIEW,
    review,
  });

  export const getReviewsThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
      const reviews = await response.json();
      dispatch(loadReviews(reviews))
      return reviews;
    }
  }

  export const addReviewThunk = (review, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(review)
    });

    if (response.ok) {
      const review = await response.json();
      dispatch(receiveReview(review))
      return review;
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
        return { ...state, [action.review.id]: action.review };
      }
    //   case UPDATE_SPOT:
    //     return { ...state, [action.spot.id]: action.spot };
    //   case REMOVE_SPOT:
    //     const newState = { ...state };
    //     delete newState[action.spotId];
    //     return newState;
      default:
        return state;
    }
  };

  export default reviewsReducer;
