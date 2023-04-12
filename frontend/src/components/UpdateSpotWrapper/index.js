import React, {useEffect}  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UpdateSpot from '../UpdateSpot';
import { useParams } from 'react-router-dom';
import { getOneSpotThunk } from '../../store/spots';

export default function UpdateSpotWrapper() {
const dispatch = useDispatch();
const { id } = useParams();
const spotData = useSelector(state=>state.spots.spot);
useEffect(() => {
    dispatch(getOneSpotThunk(id))
    }, [dispatch, id]);

if (!spotData?.name) return null;

  return (
    <div>
        <UpdateSpot spot={spotData} />
    </div>
  )
}
