import React, { useEffect, useState, useContext } from "react";
import "./OrderStatus.css";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OrderContext from "../../OrderContext";

const OrderStatus = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const navigate = useNavigate();
  const { orderID } = useContext(OrderContext);
  const [restaurantDetails, setRestaurantDetails] = useState([]);

  const [menuDetails, setMenuDetails] = useState([]);

  console.log(orderID.OrderID);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const orderResponse = await axios.get(
          `http://127.0.0.1:8000/api/orders/${orderID.OrderID}/`
        );

        console.log(orderResponse.data); // Log order data to console

        setOrderHistory(orderResponse.data);
        setMenuDetails(orderResponse.data.OrderItems);

        // Fetch restaurant details
        const restaurantResponse = await axios.get(
          `http://127.0.0.1:8000/api/restaurants/${orderID.OrderRestaurant}/`
        );

        console.log(restaurantResponse.data); // Log restaurant data to console

        setRestaurantDetails(restaurantResponse.data);

        // setMenuDetails(restaurantResponse.data.MenuDetail);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [orderID]);

  const backToHomePage = () => {
    navigate("/homepage");
  };

  return (
    <div>
      <Header />
      <div className="order-status-page">
        <div className="order-status-header">
          <h1>Order Status</h1>
        </div>

        <div className="restaurant-details">
          <h2>Restaurant Details</h2>
          <p>Order ID: {orderHistory.OrderID}</p>
          <p>Order Date: {orderHistory.OrderDate}</p>
          <p>Status: {orderHistory.OrderStatus}</p>
          <p>Name: {restaurantDetails.RestaurantName}</p>
          <p>Address: {restaurantDetails.RestaurantAdresse}</p>
          <p>Phone: {restaurantDetails.RestaurantTelefonNummer}</p>
          <img src={restaurantDetails.RestaurantImage} alt="Restaurant" />
        </div>

        <div className="order-menu">
          <h2>Ordered Menu</h2>
          {menuDetails.map((menuDetail, index) => (
            <div key={index} className="order">
              <h3>Menu Name: {menuDetail.MenuName}</h3>
              <p>Menu Description: {menuDetail.MenuDesc}</p>
              <p>Menu Type: {menuDetail.MenuTyp}</p>
              <p>Menu Quantity: {menuDetail.QuantityOrdered}</p>
              <p>Menu Note: {menuDetail.OrderedMenuItemDesc}</p>
              <p>Menu Price: {menuDetail.OrderedMenuItemPrice} €</p>
            </div>
          ))}
        </div>
        <button className="place-order-button" onClick={backToHomePage}>
          Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default OrderStatus;
