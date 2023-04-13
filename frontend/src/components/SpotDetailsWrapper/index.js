import React, {useEffect}  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneSpotThunk } from '../../store/spots';
import { getReviewsThunk } from '../../store/reviews';
import SpotDetails from '../SpotDetails';

export default function SpotDetailWrapper() {
  console.log("WRAPPER RUNNING")
const dispatch = useDispatch();
const { spotId } = useParams();
const spotData = useSelector(state=>state.spots.spot);

useEffect(() => {
    dispatch(getOneSpotThunk(spotId))
    dispatch(getReviewsThunk(spotId))
  }, [dispatch, spotId])
if (!spotData?.name) return null;

  return (
    <div>
        <SpotDetails spot={spotData} />
    </div>
  )
}
