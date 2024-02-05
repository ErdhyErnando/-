import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./EditMenu.css";
import UserContext from "../../../UserContext";
import { Link } from "react-router-dom";

function EditMenu() {
  const { user, setUser } = useContext(UserContext);
  const [menu, setMenu] = useState(user.MenuDetail);

  console.log(user.MenuDetail);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1>List of Menus</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end">
          <Link to="/editmenucreate" className="btn btn-success">
            Add +
          </Link>
        </div>
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
                <td>{menuDetail.MenuImage}</td>
                <td>{menuDetail.MenuRestaurant}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EditMenu;
