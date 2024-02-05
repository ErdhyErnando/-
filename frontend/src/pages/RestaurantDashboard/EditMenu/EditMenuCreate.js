import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../../UserContext";

export default function EditMenuCreate() {
  const { user, setUser } = useContext(UserContext);

  console.log(user.RestaurantID);

  const [formData, setFormData] = useState({
    MenuPrice: null,
    MenuTyp: "",
    MenuName: "",
    MenuDescription: "",
    MenuImage: null,
    MenuRestaurant: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "MenuImage") {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("MenuPrice", formData.MenuPrice);
    data.append("MenuTyp", formData.MenuTyp);
    data.append("MenuName", formData.MenuName);
    data.append("MenuDescription", formData.MenuDescription);
    data.append("MenuImage", formData.MenuImage);
    data.append("MenuRestaurant", user.RestaurantID);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/menus/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      navigate("/restaurantdashboard/edit");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-ligth">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1 className="text-center">Create Menu</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="MenuName" className="form-label">
              Menu Name
            </label>
            <input
              type="text"
              className="form-control"
              name="MenuName"
              value={formData.MenuName}
              onChange={handleChange}
              placeholder="Enter Menu Name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="MenuTyp" className="form-label">
              Menu Type
            </label>
            <select
              className="form-control"
              name="MenuTyp"
              value={formData.MenuTyp}
              onChange={handleChange}
              required
            >
              <option value="">Select a menu type</option>
              <option value="appetizer">Appetizer</option>
              <option value="main course">Main Course</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="MenuPrice" className="form-label">
              Menu Price
            </label>
            <input
              type="text"
              className="form-control"
              name="MenuPrice"
              onChange={handleChange}
              placeholder="Enter Menu Price"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="MenuDescription" className="form-label">
              Menu Description
            </label>
            <input
              type="text"
              className="form-control"
              name="MenuDescription"
              onChange={handleChange}
              placeholder="Enter Menu Description"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="MenuImage" className="form-label">
              Menu Image
            </label>
            <input
              type="file"
              className="form-control"
              name="MenuImage"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
