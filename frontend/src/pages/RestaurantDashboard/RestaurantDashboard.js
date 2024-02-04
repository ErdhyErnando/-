import React, { useState, useEffect, useContext } from "react";
import "./RestaurantDashboard.css";
import UserContext from "../../UserContext";
import axios from "axios";

const RestaurantDashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [restaurant, setRestaurant] = useState({});

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
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, []);

  const incomingOrders = [
    // ... incoming orders
  ];

  const orderHistory = [
    // ... order history
  ];

  const acceptOrder = (index) => {
    // Logic to accept order
  };

  const rejectOrder = (index) => {
    // Logic to reject order
  };

  console.log(restaurant.RestaurantImage);

  return (
    <div className="restaurant-dashboard">
      <h1>Restaurant Dashboard</h1>
      <div className="restaurant-details">
        <img src={restaurant.RestaurantImage} alt={restaurant.RestaurantName} />
        <h2>{restaurant.RestaurantName}</h2>
        <p>
          {restaurant.RestaurantAdresse}
          {restaurant.RestaurantPLZ}
        </p>
        <p>{restaurant.RestaurantTelefonNummer}</p>
        <button>Edit Restaurant Details</button>
        <button>Edit Menu</button>
      </div>

      <h2>Incoming Orders</h2>
      {incomingOrders.map((order, index) => (
        <div key={index} className="order">
          <h3>Delivery for {order.customerName}</h3>
          <p>{order.address}</p>
          <p>📞 {order.phone}</p>
          <div className="order-summary">
            {order.items.map((item, itemIndex) => (
              <p key={itemIndex}>
                {item.quantity}x {item.name} - {item.price.toFixed(2)} €
              </p>
            ))}
            <p>Total: {order.total.toFixed(2)} €</p>
          </div>
          <button onClick={() => rejectOrder(index)}>Reject Order</button>
          <button onClick={() => acceptOrder(index)}>Accept Order</button>
        </div>
      ))}

      <h2>Order History</h2>
      {orderHistory.map((order, index) => (
        <div key={index} className="order history">
          <h3>Delivery for {order.customerName}</h3>
          <p>{order.address}</p>
          <p>📞 {order.phone}</p>
          <div className="order-summary">
            {order.items.map((item, itemIndex) => (
              <p key={itemIndex}>
                {item.quantity}x {item.name} - {item.price.toFixed(2)} €
              </p>
            ))}
            <p>Total: {order.total.toFixed(2)} €</p>
          </div>
          <button
            className={order.status === "accepted" ? "accepted" : "rejected"}
          >
            Order {order.status}
          </button>
        </div>
      ))}
    </div>
  );
};

export default RestaurantDashboard;
