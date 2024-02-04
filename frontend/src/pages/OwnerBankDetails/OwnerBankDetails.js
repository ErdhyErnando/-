import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../UserContext";

const CreateOwnerBank = () => {
  const [formData, setFormData] = useState({
    bankname: "",
    bankaccountholder: "",
    banknummer: "",
    userid: null,
  });

  // Assume getCustomerID is a function that retrieves the customer ID from Login.js
  // This function needs to be implemented in Login.js or wherever the customer ID is stored.
  const { user, setUser } = useContext(UserContext);

  console.log(user.OwnerVorname);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("BankName", formData.bankname);
    data.append("BankAccountHolder", formData.bankaccountholder);
    data.append("BankNummer", formData.banknummer);
    data.append("UserID", user.OwnerID);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/owner-bank-accounts/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser(response.data);

      console.log("Owner Bank Detail Created", response.data); // log the user data after signup

      // Store the user data in your context
      navigate("/loginrestaurant"); // Redirect the user to the next page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Bank Account Details</h1>
      <div>
        <label>Bank Account Holder</label>
        <input
          type="text"
          name="bankaccountholder"
          value={formData.bankaccountholder}
          onChange={handleChange}
          placeholder="Insert your bank name"
        />
      </div>
      <div>
        <label>Bank Account Number</label>
        <input
          type="text"
          name="banknummer"
          value={formData.banknummer}
          onChange={handleChange}
          placeholder="Insert your bank account number"
        />
      </div>
      <div>
        <label>Bank Name</label>
        <input
          type="text"
          name="bankname"
          value={formData.bankname}
          onChange={handleChange}
          placeholder="Insert your bank account number"
        />
      </div>
      <button type="submit">Continue</button>
    </form>
  );
};

export default CreateOwnerBank;
