import React, { useState } from 'react';
import './CreateAccountRestaurant.css'; // Assuming you have a CSS file for styling

const CreateAccountRestaurant = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    password: '',
    restaurantName: '',
    restaurantTelephone: '',
    restaurantAddress: '',
    restaurantPostalCode: ''

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
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
        <h1>Creating a Lieferspatz Restaurant account</h1>
        <p>Owner's Information</p>
        
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
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        <small>Use 8 characters or more for your password</small>

        <p>Restaurant Information</p>

        <input
          type="text"
          name="restaurantName"
          value={formData.restaurantName}
          onChange={handleChange}
          placeholder="Enter the name of your restaurant"
          required
        />

        <input
          type="text"
          name="restaurantTelephone"
          value={formData.restaurantTelephone}
          onChange={handleChange}
          placeholder="Enter the telephone number of your restaurant"
          required
        />

        <input
          type="text"
          name="restaurantAddress"
          value={formData.restaurantAddress}
          onChange={handleChange}
          placeholder="Enter the address of your restaurant"
          required
        />

        <input
          type="text"
          name="restaurantPostalCode"
          value={formData.restaurantPostalCode}
          onChange={handleChange}
          placeholder="Enter the postal code of your restaurant"
          required
        />
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default CreateAccountRestaurant;
