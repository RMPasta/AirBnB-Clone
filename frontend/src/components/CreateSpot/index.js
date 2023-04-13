import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createSpotThunk } from "../../store/spots";
import { getSpotsThunk } from "../../store/spots";
import { createSpotImageThunk } from "../../store/spotImage";
import "./CreateSpot.css";

function CreateSpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState("");

  // const [country, setCountry] = useState("USA");
  // const [address, setAddress] = useState("1 cool street");
  // const [city, setCity] = useState("hamilton");
  // const [state, setState] = useState("nj");
  // const [lat, setLat] = useState(111);
  // const [lng, setLng] = useState(111);
  // const [description, setDescription] = useState(
  //   "Really cool place right by all the good things. You're going to love this spot."
  // );
  // const [name, setName] = useState("great cool new place");
  // const [price, setPrice] = useState(111);
  // const [preview, setPreview] = useState(
  //   "https://a0.muscache.com/im/pictures/9b1dac05-b810-46ea-8d35-f57072af1fe1.jpg?im_w=1200"
  // );

  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    dispatch(getSpotsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (
      country &&
      address &&
      city &&
      state &&
      lat &&
      lng &&
      description &&
      name &&
      price &&
      preview
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [country, address, city, state, lat, lng]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!lat) setErrors({ ...errors, lat: "Latitude is required" });
    if (!lng) setErrors({ ...errors, lng: "Longitude is required" });
    if (description.length < 30)
      setErrors({
        ...errors,
        description: "Description needs a minimum of 30 characters",
      });
    if (!name) setErrors({ ...errors, name: "Name is required" });
    if (!price) setErrors({ ...errors, price: "Price is required" });
    if (!preview)
      setErrors({ ...errors, preview: "Preview Image is required" });

    if (Object.values(errors).length > 0) return errors;
    const newSpot = await dispatch(
      createSpotThunk({
        country,
        address,
        city,
        state,
        lat,
        lng,
        description,
        name,
        price,
      })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
    await dispatch(getSpotsThunk());
    await dispatch(createSpotImageThunk(newSpot.id, preview, true));
    history.push(`/spots/${newSpot.id}`);
  };

  return (
    <div className="create-spot-page">
      <div className="headers">
        <h1>Create a New Spot</h1>
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
            placeholder="Country"
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
            placeholder="Address"
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
              placeholder="City"
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
              placeholder="STATE"
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
              placeholder="Latitude"
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
              placeholder="Longitude"
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
            placeholder="Please write at least 30 characters"
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
            Catch guests' attention with a spot title ethat highlights what
            makes your place special.
          </p>
        </div>
        <label>
          Name
          <input
            type="text"
            placeholder="Name of your spot"
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
              placeholder="Price per night (USD)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </label>
        <div className="error-container">
          {errors.price && <p>{errors.price}</p>}
        </div>
        <div className="description">
          <h2 className="h2">Liven up your spot with a photo</h2>
          <p>Submit a link to a photo to publish your spot.</p>
        </div>
        <label>
          Preview Image URL
          <input
            type="text"
            placeholder="Preview Url"
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
          />
        </label>
        <div className="error-container">
          {errors.preview && <p>{errors.preview}</p>}
        </div>
        <button disabled={disabled} type="submit">
          Create Spot
        </button>
      </form>
    </div>
  );
}

export default CreateSpot;
