import React, { useContext, useEffect, useState } from "react";
import classes from "./header.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserContext from "../../UserContext"; // import UserContext
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();
  // const { CustomerID } = useParams();
  const { user, setUser } = useContext(UserContext); // use UserContext

  const handleLogout = async () => {
    try {
      // Call the logout API
      await axios.post("http://127.0.0.1:8000/api/customers/logout/");

      console.log("User logged out successfully");

      // Clear the user data when logging out
      setUser(null);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/homepage" className={classes.logo}>
          Lieferspatz!
        </Link>
        <nav>
          <ul>
            {user ? (
              <li className={classes.menu_container}>
                <Link>{user.CustomerVorname}</Link>
                <div className={classes.menu}>
                  <Link to="/orderstatus">Orders</Link>
                  <a onClick={handleLogout}>Logout</a>
                </div>
              </li>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
