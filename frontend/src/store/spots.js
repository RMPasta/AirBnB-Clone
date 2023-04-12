import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const LOAD_SPOT = 'spots/LOAD_SPOT';
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOT';
export const UPDATE_SPOT = 'spots/UPDATE_SPOT';
export const REMOVE_SPOT = 'spots/REMOVE_SPOT';

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots,
  });

  export const loadSpot = (spot) => ({
    type: LOAD_SPOT,
    spot,
  });

  export const receiveSpot = (spot) => ({
    type: RECEIVE_SPOT,
    spot,
  });

  export const editSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot,
  });

  export const removeSpot = (spotId) => ({
    type: REMOVE_SPOT,
    spotId,
  });

  export const getSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
      const spotsObj = await response.json();
      const spots = spotsObj.Spots;
      dispatch(loadSpots(spots))
      return spots;
    }
  }


  export const getOneSpotThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
      const spot = await response.json();
      dispatch(loadSpot(spot))
      return spot;
    }
  }

  export const createSpotThunk = (spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(spot)
    });

    if (response.ok) {
      const spot = await response.json();
      dispatch(receiveSpot(spot))
      return spot;
    }
  }

  export const updateSpotThunk = (spot, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(spot)
    });

    if (response.ok) {
      const spot = await response.json();
      dispatch(receiveSpot(spot))
      return spot;
    }
  }

  export const deleteSpotThunk = (spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(spot)
    });

    if (response.ok) {
      const res = await response.json();
      dispatch(removeSpot(spot.id))
      return res;
    }
  }

  const initialState = {
    spots: {},
    spot: {}
  }

  const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_SPOTS: {
        const newState = {};
        action.spots.forEach((spot) => {
          newState[spot.id] = spot;
        });
        return newState;
      }
      case LOAD_SPOT: {
        const newState = {...state.spots, ...state.spot};
        newState.spot = action.spot;
        return newState;
      }
      case RECEIVE_SPOT: {
        const newState = { ...state.spots, [action.spot.id]: action.spot };
        return newState;
      }
      case UPDATE_SPOT:
        return { ...state, [action.spot.id]: action.spot };
      case REMOVE_SPOT:
        const newState = { ...state };
        delete newState[action.spotId];
        return newState;
      default:
        return state;
    }
  };

  export default spotsReducer;
