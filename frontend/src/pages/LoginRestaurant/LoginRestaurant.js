import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginRestaurant.css"; // Assuming you have a CSS file for styling

const LoginRestaurant = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRestaurantSignIn = () => {
    navigate("/restaurantdashboard");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic
    console.log(formData);
  };

  return (
    <div className="create-account-container">
      <form onSubmit={handleSubmit}>
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
        <Link to="/CreateAccountRestaurant">
          Don't have an account? Create your restaurant account here
        </Link>

        <button type="submit" onClick={handleRestaurantSignIn}>
          Log in
        </button>
      </form>
    </div>
  );
};

export default LoginRestaurant;
