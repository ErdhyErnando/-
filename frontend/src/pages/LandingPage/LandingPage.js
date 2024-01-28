import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Assuming you have a CSS file for styling

function LandingPage() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/food/:id");
  };

  return (
    <div>
      <h1>Lieferspatz</h1>
      <h2>DHL but for food!</h2>
      <div>
        <button>
          <Link to="/Login">Log in now and start food hunting!</Link>
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
