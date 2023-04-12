import { csrfFetch } from "./csrf";

export const LOAD_SPOT = 'spots/LOAD_SPOT';

export const loadSpot = (spot) => ({
    type: LOAD_SPOT,
    spot,
  });

  export const getOneSpotThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
      const spot = await response.json();
      dispatch(loadSpot(spot))
      return spot;
    }
  }

  const oneSpotReducer = (state = {}, action) => {
    switch (action.type) {
      case LOAD_SPOT: {
        return action.spot;
      }
      default:
        return state;
    }
  };

  export default oneSpotReducer;
