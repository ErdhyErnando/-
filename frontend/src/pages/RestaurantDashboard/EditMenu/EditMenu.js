import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./EditMenu.css";
import UserContext from "../../../UserContext";
import { Link } from "react-router-dom";

function EditMenu() {
  const { user } = useContext(UserContext);
  const [restaurant, setRestaurant] = useState({});
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const ownerResponse = await axios.get(
          `http://127.0.0.1:8000/api/owners/${user.OwnerID}/`
        );

        console.log(ownerResponse.data); // Log owner data to console
        const restaurantResponse = await axios.get(
          `http://127.0.0.1:8000/api/restaurants/${ownerResponse.data.RestaurantID}/`
        );
        setRestaurant(restaurantResponse.data);
        setMenu(restaurantResponse.data.MenuDetail || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, []);

  // setMenu(restaurantResponse.data);

  console.log(restaurant.RestaurantName);

  console.log(user.MenuDetail);

  const handleDelete = (MenuID) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this menu?"
    );
    if (confirm) {
      axios
        .delete(`http://127.0.0.1:8000/api/menus/${MenuID}/`)
        .then(async (response) => {
          // Fetch the updated data after a menu item is deleted
          const ownerResponse = await axios.get(
            `http://127.0.0.1:8000/api/owners/${user.OwnerID}/`
          );
          const restaurantResponse = await axios.get(
            `http://127.0.0.1:8000/api/restaurants/${ownerResponse.data.RestaurantID}/`
          );
          setRestaurant(restaurantResponse.data);
          setMenu(restaurantResponse.data.MenuDetail || []);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1>List of Menus</h1>
      <h2>
        <Link to="/restaurantdashboard">Back to Dashboard</Link>
      </h2>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end">
          <Link to="/editmenucreate" className="btn btn-success">
            Add +
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-stripend">
            <thead>
              <tr>
                <th>Menu ID</th>
                <th>Menu Price</th>
                <th>Menu Type</th>
                <th>Menu Name</th>
                <th>Menu Description</th>
                <th>Menu Image</th>
                <th>Menu Restaurant</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((menuDetail, i) => (
                <tr key={i}>
                  <td>{menuDetail.MenuID}</td>
                  <td>{menuDetail.MenuPrice}</td>
                  <td>{menuDetail.MenuTyp}</td>
                  <td>{menuDetail.MenuName}</td>
                  <td>{menuDetail.MenuDescription}</td>
                  <td>
                    <img
                      src={menuDetail.MenuImage}
                      alt={menuDetail.MenuName}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>
                  <td>{menuDetail.RestaurantID}</td>
                  <td>
                    <Link to={`/editmenuupdate/${menuDetail.MenuID}`}>
                      <button
                        className="btn btn-sm btn-primary me-2 text-white"
                        style={{ width: "80px", height: "30px" }}
                      >
                        Edit /
                      </button>
                    </Link>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={(e) => handleDelete(menuDetail.MenuID)}
                      style={{ width: "80px", height: "30px" }}
                    >
                      Delete -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EditMenu;
