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
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState("");

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
      description &&
      name &&
      price &&
      preview
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [country, address, city, state, description, name, price, preview]);

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (description.length < 30)
      return setErrors({
        ...errors,
        description: "Description needs a minimum of 30 characters",
      });
    if (!name) return setErrors({ ...errors, name: "Name is required" });
    if (!price) return setErrors({ ...errors, price: "Price is required" });
    if (isNaN(price))
      return setErrors({ ...errors, price: "Price must be a valid number" });
    if (!preview)
      return setErrors({ ...errors, preview: "Preview Image is required" });
    // console.log("hello?")

    // if (
    //   description.length < 30 ||
    //   !name ||
    //   !price ||
    //   !preview ||
    //   typeof price !== "number"
    //   )
    //   return errors;
    const newSpot = await dispatch(
      createSpotThunk({
        country,
        address,
        city,
        state,
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
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="">Select a country</option>
            <option value="United States">United States</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Brazil">Brazil</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Russia">Russia</option>
            <option value="Mexico">Mexico</option>
            <option value="Japan">Japan</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Philippines">Philippines</option>
            <option value="Egypt">Egypt</option>
            <option value="Vietnam">Vietnam</option>
          </select>
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
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="state"
            >
              <option value="">Select a state</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            <div className="error-container">
              {errors.state && <p>{errors.state}</p>}
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
            Catch guests' attention with a spot title that highlights what makes
            your place special.
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
        <button disabled={disabled} type="submit" className="submit-create">
          Create Spot
        </button>
      </form>
    </div>
  );
}

export default CreateSpot;
