import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { updateSpotThunk } from "../../store/spots";
import "./UpdateSpot.css";

function UpdateSpot({ spot }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [country, setCountry] = useState(spot?.country);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [lat, setLat] = useState(spot?.lat);
  const [lng, setLng] = useState(spot?.lng);
  const [description, setDescription] = useState(spot?.description);
  const [name, setName] = useState(spot?.name);
  const [price, setPrice] = useState(spot?.price);
  const [errors, setErrors] = useState({});

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!lat) setErrors({ ...errors, lat: "Latitude is required" });
    if (!lng) setErrors({ ...errors, lng: "Longitude is required" });
    if (!Number.isInteger(lat))
      setErrors({ ...errors, lat: "Latitude must be a number" });
    if (!Number.isInteger(lng))
      setErrors({ ...errors, lng: "Longitude must be a number" });
    if (description.length < 30)
      setErrors({
        ...errors,
        description: "Description needs a minimum of 30 characters",
      });
    // const errorPlaceHolder = "description error";
    if (!name) setErrors({ ...errors, name: "Name is required" });
    if (!price) setErrors({ ...errors, price: "Price is required" });
    // if (Object.values(errors).length > 0) return errors;
    if (
      !lat ||
      !lng ||
      description.length < 30 ||
      !name ||
      !price ||
      !Number.isInteger(lat) ||
      !Number.isInteger(lng)
    )
      return errors;
    await dispatch(
      updateSpotThunk(
        {
          country,
          address,
          city,
          state,
          lat,
          lng,
          description,
          name,
          price,
        },
        id
      )
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
    history.push(`/spots/${id}`);
  };

  return (
    <div className="create-spot-page">
      <div className="headers">
        <h1>Update your Spot</h1>
        <h2>Where's your place located?</h2>
        <p>
          Guests will only get your exact address once they've booked a
          reservation.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <div className="error-container">
          {errors.country && <p>{errors.country}</p>}
        </div>
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <div className="error-container">
          {errors.address && <p>{errors.address}</p>}
        </div>
        <div className="form-two-across">
          <label>
            City
            <input
              type="text"
              value={city}
              className="city"
              onChange={(e) => setCity(e.target.value)}
            />
            <div className="error-container">
              {errors.city && <p>{errors.city}</p>}
            </div>
          </label>
          <label>
            State
            <input
              type="text"
              value={state}
              className="state"
              onChange={(e) => setState(e.target.value)}
            />
            <div className="error-container">
              {errors.state && <p>{errors.state}</p>}
            </div>
          </label>
        </div>
        <div className="form-two-across">
          <label>
            Latitude
            <input
              type="text"
              value={lat}
              className="lat"
              onChange={(e) => setLat(e.target.value)}
            />
            <div className="error-container">
              {errors.lat && <p>{errors.lat}</p>}
            </div>
          </label>
          <label>
            Longitude
            <input
              type="text"
              value={lng}
              className="lng"
              onChange={(e) => setLng(e.target.value)}
            />
            <div className="error-container">
              {errors.lng && <p>{errors.lng}</p>}
            </div>
          </label>
        </div>
        <div className="description">
          <h2 className="h2">Describe your place to guests</h2>
          <p>
            Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love about your neighborhood.
          </p>
        </div>
        <label>
          Description
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <div className="error-container">
          {errors.description && <p>{errors.description}</p>}
        </div>
        <div className="description">
          <h2 className="h2">Create a title for your spot</h2>
          <p>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
        </div>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <div className="error-container">
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div className="description">
          <h2 className="h2">Set a base price for your spot</h2>
          <p>
            Competetive pricing can help your listing stand out and rank higher
            in search results.
          </p>
        </div>
        <label>
          Price
          <div>
            ${" "}
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </label>
        <div className="error-container">
          {errors.price && <p>{errors.price}</p>}
        </div>
        <button className="update-button" type="submit">
          Update your Spot
        </button>
      </form>
    </div>
  );
}

export default UpdateSpot;
