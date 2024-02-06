import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../UserContext"; // Update this path if needed
import "./Login.css"; // Assuming you have a CSS file for styling

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCustomerSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/customers/login/",
        {
          CustomerPasswort: formData.password,
          CustomerEmail: formData.email,
        }
      );

      console.log(response.data);

      const userDetailsResponse = await axios.get(
        `http://127.0.0.1:8000/api/customers/${response.data.CustomerID}/`
      );

      setUser(userDetailsResponse.data);

      // If successful login, navigate to the restaurant dashboard
      navigate("/homepage");
    } catch (error) {
      console.error(error);
      setErrorMessage("The username or password is incorrect");
    }
  };

  return (
    <div className="create-account-container">
      <form onSubmit={handleCustomerSignIn}>
        <h1>Log in to your Lieferspatz Customer account</h1>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your customer email address"
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

        <Link to="/CreateAccount">
          Don't have an account? Create your customer account here
        </Link>

        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
