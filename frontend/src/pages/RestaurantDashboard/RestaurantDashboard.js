import React, { useState } from "react";
import "./RestaurantDashboard.css"; // Make sure to create an accompanying CSS file for styling
import { sample_restaurant } from "../../restaurantData";

const RestaurantDashboard = () => {
  // Filter the sample_restaurant array to get the restaurant with id: "1"
  const selectedRestaurant = sample_restaurant.find(
    (restaurant) => restaurant.id === "3"
  );

  if (!selectedRestaurant) {
    // Handle the case when the restaurant with id: "1" is not found
    return <div>Restaurant not found</div>;
  }

  // Dummy data for the purpose of this example
  const incomingOrders = [
    {
      customerName: "Andrew Bernhardt",
      address: "Dusseldorferstr. 27, 48054 Duisburg",
      phone: "+491575776789",
      items: [
        { name: "Winger Bucket Special", quantity: 2, price: 20.58 },
        { name: "Mashed Potato with Gravy", quantity: 3, price: 10.47 },
      ],
      total: 31.05,
    },
    // ... more incoming orders
  ];

  const orderHistory = [
    {
      customerName: "Erdhy Ernando",
      address: "Neudorfstr. 23, 48050 Duisburg",
      phone: "+491575771234",
      items: [
        { name: "Winger Bucket Special", quantity: 1, price: 10.29 },
        { name: "Chocolate Cookie", quantity: 3, price: 5.97 },
      ],
      status: "accepted",
      total: 16.26,
    },
    // ... more past orders
  ];

  // Functions to accept or reject orders would be here
  // For example:
  const acceptOrder = (index) => {
    // Logic to accept order
  };

  const rejectOrder = (index) => {
    // Logic to reject order
  };

  return (
    <div className="restaurant-dashboard">
      <h1>Restaurant Dashboard</h1>
      {/* Restaurant details component */}
      <div className="restaurant-details">
        <img src={selectedRestaurant.imageUrl} alt={selectedRestaurant.name} />
        <h2>{selectedRestaurant.name}</h2>
        <p>Königstraße 56, 47051 Duisburg</p>
        <p>📞 0203 28951820</p>
        <button>Edit Restaurant Details</button>
        <button>Edit Menu</button>
      </div>

      <h2>Incoming Orders</h2>
      {/* List incoming orders */}
      {incomingOrders.map((order, index) => (
        <div key={index} className="order">
          <h3>Delivery for {order.customerName}</h3>
          <p>{order.address}</p>
          <p>📞 {order.phone}</p>
          {/* Order summary details */}
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
      {/* List order history */}
      {orderHistory.map((order, index) => (
        <div key={index} className="order history">
          <h3>Delivery for {order.customerName}</h3>
          <p>{order.address}</p>
          <p>📞 {order.phone}</p>
          {/* Order summary details */}
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
