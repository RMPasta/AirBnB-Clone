import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotsThunk } from "../../store/spots";
import Landing from "../Landing";

export default function LandingWrapper() {
  const dispatch = useDispatch();
  const spotsObj = useSelector((state) => state.spots);
  const spots = Object.values(spotsObj);

  useEffect(() => {
    dispatch(getSpotsThunk());
  }, [dispatch]);

  if (!spots) return <div>...Loading</div>;
  return <Landing spots={spots} />;
}
