import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { createSpotThunk } from "../../store/spots";
import "./CreateSpot.css";

function CreateSpot() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [country, setCountry] = useState("dfsg");
  const [address, setAddress] = useState("sdfg");
  const [city, setCity] = useState("sdfg");
  const [state, setState] = useState("sdfg");
  const [lat, setLat] = useState(111);
  const [lng, setLng] = useState(111);
  const [description, setDescription] = useState("sfdg");
  const [name, setName] = useState("sdfg");
  const [price, setPrice] = useState(111);
  const [preview, setPreview] = useState("sdfg");
  const [img1, setImg1] = useState("sdfg");
  const [img2, setImg2] = useState("sdfg");
  const [img3, setImg3] = useState("sdfg");
  const [img4, setImg4] = useState("sdfg");
  const [errors, setErrors] = useState({});
  if (!sessionUser) return <Redirect to='/' />

  const handleSubmit = (e) => {
    e.preventDefault();
    if (country) {
      setErrors({});
      return dispatch(
        createSpotThunk({
          country,
          address,
          city,
          state,
          lat,
          lng,
          description,
          name,
          price
        //   preview,
        //   img1,
        //   img2,
        //   img3,
        //   img4
        })
      )
      .catch(async (res) => {
        const data = await res.json();
        console.log(data)
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
    //   confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className="create-spot-page">
      <div className="headers">
        <h1>Create a New Spot</h1>
        <h2>Where's your place located?</h2>
        <p>Guests will only get your exact address once they've booked a reservation.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
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
            required
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
              required
            />
          </label>
          <div className="error-container">
          {errors.city && <p>{errors.city}</p>}
          </div>
          <label>
            State
            <input
              type="text"
              value={state}
              className="state"
              onChange={(e) => setState(e.target.value)}
              required
            />
          </label>
          <div className="error-container">
          {errors.state && <p>{errors.state}</p>}
          </div>
        </div>
        <div className="form-two-across">
          <label>
            Latitude
            <input
              type="text"
              value={lat}
              className="lat"
              onChange={(e) => setLat(e.target.value)}
              required
            />
          </label>
          <div className="error-container">
          {errors.lat && <p>{errors.lat}</p>}
          </div>
          <label>
            Longitude
            <input
              type="text"
              value={lng}
              className="lng"
              onChange={(e) => setLng(e.target.value)}
              required
            />
          </label>
          <div className="error-container">
          {errors.lng && <p>{errors.lng}</p>}
          </div>
        </div>
        <div className="description">
          <h2 className=".h2">Describe your place to guests</h2>
          <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about your neighborhood.</p>
        </div>
        <label>
          Description
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <div className="error-container">
        {errors.description && <p>{errors.description}</p>}
        </div>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <div className="error-container">
        {errors.name && <p>{errors.name}</p>}
        </div>
        <label>
          Price
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <div className="error-container">
        {errors.price && <p>{errors.price}</p>}
        </div>
        <label>
          Preview Image URL
          <input
            type="text"
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
            required
          />
        </label>
        <div className="error-container">
        {errors.preview && <p>{errors.preview}</p>}
        </div>
        <label>
          Image Url
          <input
            type="text"
            value={img1}
            onChange={(e) => setImg1(e.target.value)}
            required
          />
        </label>
        <div className="error-container">
        {errors.img1 && <p>{errors.img1}</p>}
        </div>
        <label>
        Image Url
          <input
            type="text"
            value={img2}
            onChange={(e) => setImg2(e.target.value)}
            required
          />
        </label>
        <div className="error-container">
        {errors.img2 && <p>{errors.img2}</p>}
        </div>
        <label>
        Image Url
          <input
            type="text"
            value={img3}
            onChange={(e) => setImg3(e.target.value)}
            required
          />
        </label>
        <div className="error-container">
        {errors.img3 && <p>{errors.img3}</p>}
        </div>
        <label>
        Image Url
          <input
            type="text"
            value={img4}
            onChange={(e) => setImg4(e.target.value)}
            required
          />
        </label>
        <div className="error-container">
        {errors.img4 && <p>{errors.img4}</p>}
        </div>
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
}

export default CreateSpot;
