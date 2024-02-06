import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditMenuUpdate() {
  const { MenuID } = useParams();
  const [menu, setMenu] = useState({}); // Set the initial state to an empty object [{}
  const [values, setValues] = useState({
    MenuPrice: "",
    MenuTyp: "",
    MenuName: "",
    MenuDescription: "",
    MenuImage: "",
    RestaurantID: null,
  });

  const [file, setFile] = useState(null); // Set the initial state to null [null

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const menuResponse = await axios.get(
          `http://127.0.0.1:8000/api/menus/${MenuID}/`
        );
        console.log(menuResponse.data);

        setValues({
          MenuPrice: menuResponse.data.MenuPrice,
          MenuTyp: menuResponse.data.MenuTyp,
          MenuName: menuResponse.data.MenuName,
          MenuDescription: menuResponse.data.MenuDescription,
          MenuImage: menuResponse.data.MenuImage,
          RestaurantID: menuResponse.data.RestaurantID,
        });
        setMenu(menuResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, []);

  const handleUpdate = (event) => {
    event.preventDefault();

    const formData = new FormData();

    for (const key in values) {
      formData.append(key, values[key]);
    }

    formData.append("MenuImage", file);

    axios
      .put(`http://127.0.0.1:8000/api/menus/${MenuID}/`, formData)
      .then((res) => {
        console.log(res);
        navigate("/restaurantdashboard/edit");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-ligth">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1 className="text-center">Update/Edit Menu</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label htmlFor="MenuName" className="form-label">
              Menu Name
            </label>
            <input
              type="text"
              className="form-control"
              name="MenuName"
              value={values.MenuName}
              onChange={(e) =>
                setValues({ ...values, MenuName: e.target.value })
              }
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
              value={values.MenuTyp}
              onChange={(e) =>
                setValues({ ...values, MenuTyp: e.target.value })
              }
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
              value={values.MenuPrice}
              onChange={(e) =>
                setValues({ ...values, MenuPrice: e.target.value })
              }
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
              value={values.MenuDescription}
              onChange={(e) =>
                setValues({ ...values, MenuDescription: e.target.value })
              }
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
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update/Edit
          </button>
          <Link to="/restaurantdashboard/edit" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}
