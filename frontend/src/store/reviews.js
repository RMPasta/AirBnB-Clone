import { csrfFetch } from "./csrf";

export const LOAD_REVIEWS = 'spots/LOAD_REVIEWS';

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews,
  });

  export const getReviewsThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
      const reviews = await response.json();
      dispatch(loadReviews(reviews))
      return reviews;
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
    //   case RECEIVE_SPOT:
    //     return { ...state, [action.spot.id]: action.spot };
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
