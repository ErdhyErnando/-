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
          <h3>Teile uns deinen Standort mit</h3>
          <p>
            Wir zeigen dir Geschäfte und Restaurants in deiner Nähe, wo du
            bestellen kannst.
          </p>
        </div>
        <div className="service">
          <h3>Suche, worauf du Lust hast</h3>
          <p>
            Suche nach Artikeln, Gerichten, Geschäften oder einer bestimmten
            Küche.
          </p>
        </div>
        <div className="service">
          <h3>Bestelle zur Lieferung oder Abholung</h3>
          <p>Wir informieren dich über den Status deiner Bestellung.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
