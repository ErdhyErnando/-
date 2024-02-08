import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Assuming you have a CSS file for styling

function LandingPage() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <div className="landing-page-container">
      <h1>Lieferspatz</h1>
      <h2>InsyAllah will be delivered to your home 🙏</h2>
      <button className="login-button" onClick={handleSignIn}>
        Log In
      </button>

      <div className="services">
        <div className="service">
          <h3>Are you Hungry? 😋</h3>
          <p>We got the platform for you to order food from your favorite</p>
        </div>
        <div className="service">
          <h3>You don't want to cook? 🧑‍🍳</h3>
          <p>we'll bring the food to your door!</p>
        </div>
        <div className="service">
          <h3>Expensive Delivery Price? 🛵</h3>
          <p>Free delivery fee every 1st week of the month!</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
