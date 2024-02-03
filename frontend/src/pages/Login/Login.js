import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../UserContext"; // Update this path if needed
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const navigate = useNavigate();

  // Use the useContext hook to get the setUser function from UserContext
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/customers/login/",
        {
          CustomerPasswort: formData.password,
          CustomerEmail: formData.email,
        }
      );

      console.log("User logged in:", response.data); // log the user data after login

      // Fetch the user details using the CustomerID
      const userDetailsResponse = await axios.get(
        `http://127.0.0.1:8000/api/customers/${response.data.CustomerID}/`
      );

      // Store the user data in your context
      setUser(userDetailsResponse.data);

      navigate("/homepage");
    } catch (error) {
      console.error(error);
      setErrorMessage("The username or password is incorrect");
    }
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

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <Link to="/CreateAccount">New here? Create your account here</Link>
        <Link to="/LoginRestaurant">Restaurant Owner? Log in here</Link>

        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
