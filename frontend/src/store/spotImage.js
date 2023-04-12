import { csrfFetch } from "./csrf";

export const RECEIVE_SPOT_IMAGE = 'spotImage/RECEIVE_SPOT_IMAGE';

export const receiveSpotImage = (spotImage) => ({
    type: RECEIVE_SPOT_IMAGE,
    spotImage,
  });

export const createSpotImageThunk = (spotId, url, previewBool) => async dispatch => {
    const reqBody = {
        "url": url,
        "preview": previewBool
    }
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(reqBody)
    });

    if (response.ok) {
        const res = await response.json();
        const url = res.url;
        dispatch(receiveSpotImage(url))
        return url;
    }
}

const spotsImageReducer = (state = {}, action) => {
    switch (action.type) {
      case RECEIVE_SPOT_IMAGE: {
        const newState = {};
        newState[action.spotImage.id] = action.spotImage;
        return newState;
      }
      default:
        return state;
    }
  };

  export default spotsImageReducer;
