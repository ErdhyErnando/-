import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginRestaurant.css"; // Assuming you have a CSS file for styling

const LoginRestaurant = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRestaurantSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/owners/login/",
        {
          OwnerPasswort: formData.password,
          OwnerEmail: formData.email,
        }
      );

      console.log(response.data);

      // If successful login, navigate to the restaurant dashboard
      navigate("/restaurantdashboard");
    } catch (error) {
      console.error(error);
      setErrorMessage("The username or password is incorrect");
    }
  };

  return (
    <div className="create-account-container">
      <form onSubmit={handleRestaurantSignIn}>
        <h1>Log in to your Lieferspatz Restaurant account</h1>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your restaurant email address"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <Link to="/CreateAccountRestaurant">
          Don't have an account? Create your restaurant account here
        </Link>

        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default LoginRestaurant;
