import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../UserContext";
import "./AddRestaurantDetails.css";

const AddRestaurantDetails = () => {
  const [formData, setFormData] = useState({
    restaurantName: "",
    restaurantAddress: "",
    restaurantPostalCode: "",
    restaurantTelephone: "",
    restaurantOwner: null,
    restaurantImage: null,
    openHour: "",
    closeHour: "",
  });

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "restaurantImage") {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("RestaurantName", formData.restaurantName);
    data.append("RestaurantAdresse", formData.restaurantAddress);
    data.append("RestaurantPLZ", formData.restaurantPostalCode);
    data.append("RestaurantTelefonNummer", formData.restaurantTelephone);
    data.append("RestaurantOwner", user.OwnerID);
    data.append("RestaurantImage", formData.restaurantImage);
    data.append("OpenHour", formData.openHour);
    data.append("CloseHour", formData.closeHour);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/restaurants/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const userDetailsResponse = await axios.get(
        `http://127.0.0.1:8000/api/owners/${user.OwnerID}/`
      );

      setUser(response.data);
      setUser(userDetailsResponse.data);

      navigate("/ownerbankdetail");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-restaurant-container">
      <form onSubmit={handleSubmit}>
        <h1>Adding Restaurant Details</h1>

        <input
          type="tel"
          name="restaurantTelephone"
          value={formData.restaurantTelephone}
          onChange={handleChange}
          placeholder="Enter restaurant telephone number"
          required
        />

        <input
          type="text"
          name="restaurantName"
          value={formData.restaurantName}
          onChange={handleChange}
          placeholder="Enter restaurant name"
          required
        />

        <input
          type="text"
          name="restaurantAddress"
          value={formData.restaurantAddress}
          onChange={handleChange}
          placeholder="Enter restaurant address"
          required
        />

        <input
          type="text"
          name="restaurantPostalCode"
          value={formData.restaurantPostalCode}
          onChange={handleChange}
          placeholder="Enter restaurant postal code"
          required
        />

        <input
          type="text"
          name="openHour"
          value={formData.openHour}
          onChange={handleChange}
          placeholder="Enter restaurant opening hours"
          required
        />

        <input
          type="text"
          name="closeHour"
          value={formData.closeHour}
          onChange={handleChange}
          placeholder="Enter restaurant closing hours"
          required
        />

        <input
          type="file"
          name="restaurantImage"
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Restaurant Details</button>
      </form>
    </div>
  );
};

export default AddRestaurantDetails;
