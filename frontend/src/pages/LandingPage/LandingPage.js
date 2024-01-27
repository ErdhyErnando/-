import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './LandingPage.css'; // Assuming you have a CSS file for styling

function LandingPage() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/food/:id");
  };

  return (
    <div>
      <h1>Order Foods and More</h1>
      <h2>Restaurants and Shops deliver to you</h2>
      <div>
        <Link to="/Login">Log in now and start food hunting!</Link>
      </div>
    </div>
  );
}

export default LandingPage;
