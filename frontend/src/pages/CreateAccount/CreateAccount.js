import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAccount.css"; // Assuming you have a CSS file for styling

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    address: "",
    postalCode: "",
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

  const handleSignUp = () => {
    navigate("/homepage");
  };

  return (
    <div className="create-account-container">
      <form onSubmit={handleSubmit}>
        <h1>Creating a Lieferspatz Account</h1>
        <p>User Information</p>

        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter your first name"
          required
        />

        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter your last name"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          required
        />

        <input
          type="tel"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          placeholder="Enter your telephone number"
          required
        />

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your home address"
          required
        />

        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          placeholder="Enter your postal code"
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
        <small>Use 8 characters or more for your password</small>

        <button type="submit" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
