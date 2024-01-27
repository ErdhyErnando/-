import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Assuming you have a CSS file for styling

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate("/homepage");
  };

  return (
    <div className="create-account-container">
      <form onSubmit={handleSubmit}>
        <h1>Log in to your account</h1>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
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
        <Link to="/CreateAccount">New here? Create your account here</Link>
        <Link to="/LoginRestaurant">Restaurant Owner? Log in here</Link>

        <button type="submit" onClick={handleLogIn}>
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
