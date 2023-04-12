import React, {useEffect}  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UpdateSpot from '../UpdateSpot';
import { useParams } from 'react-router-dom';
import { getOneSpotThunk } from '../../store/spots';

export default function EditSpotWrapper() {
  console.log("WRAPPER RUNNING")
const dispatch = useDispatch();
const { id } = useParams();
const spotData = useSelector(state=>state.spots.spot);
useEffect(() => {
    dispatch(getOneSpotThunk(id))
    }, [dispatch, id]);

// console.log(spotData)
if (!spotData?.name) return null;

  return (
    <div>
        <UpdateSpot spot={spotData} />
    </div>
  )
}
