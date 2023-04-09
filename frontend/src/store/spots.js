import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
// export const RECEIVE_SPOT = 'spots/RECEIVE_SPOT';
// export const UPDATE_SPOT = 'spots/UPDATE_SPOT';
// export const REMOVE_SPOT = 'spots/REMOVE_SPOT';

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots,
  });

//   export const receiveSpot = (spot) => ({
//     type: RECEIVE_SPOT,
//     spot,
//   });

//   export const editSpot = (spot) => ({
//     type: UPDATE_SPOT,
//     spot,
//   });

//   export const removeSpot = (spotId) => ({
//     type: REMOVE_SPOT,
//     spotId,
//   });

  export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
      const spotsObj = await response.json();
      const spots = spotsObj.Spots;
      dispatch(loadSpots(spots))
      return spots;
    }
  }

  const spotsReducer = (state = {}, action) => {
    switch (action.type) {
      case LOAD_SPOTS:
        const spotsState = {};
        action.spots.forEach((spot) => {
          spotsState[spot.id] = spot;
        });
        return spotsState;
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

  export default spotsReducer;
