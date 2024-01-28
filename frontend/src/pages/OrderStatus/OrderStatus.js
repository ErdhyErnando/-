import React from "react";
import "./OrderStatus.css"; // Make sure to create an accompanying CSS file for styling

const OrderStatus = () => {
  // Dummy data to simulate fetched order status and history
  const orderStatus = {
    isPaymentSuccessful: true,
    isFoodBeingPrepared: true,
    isFoodBeingDelivered: true,
    isOrderComplete: true,
  };

  const orderHistory = [
    {
      restaurantName: "KFC",
      address: "Kingstonstraße 5a, 47055 Duisburg",
      time: "05.02.2023 - 11:43 am",
      totalPrice: "14,27 €",
      status: "ongoing",
      items: [
        {
          name: "Winger Bucket Special",
          price: "10,29 €",
        },
      ],
      deliveryFee: "2,49 €",
      platformFee: "1,49 €",
    },
    // ... Add more orders as needed
  ];

  return (
    <div className="order-status-page">
      <div className="order-status-header">
        <h1>Order Status</h1>
        {/* Status icons would go here */}
      </div>

      <div className="order-history">
        <h2>Order History</h2>
        {orderHistory.map((order, index) => (
          <div key={index} className="order">
            <h3>{order.restaurantName}</h3>
            <p>{order.address}</p>
            <p>{order.time}</p>
            <p>Total: {order.totalPrice}</p>
            {/* Order summary details would be mapped here */}
            <div className="order-summary">
              {/* Map through items and display them */}
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="item">
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </div>
              ))}
              <p>
                Subtotal:{" "}
                {order.items
                  .reduce((total, item) => total + parseFloat(item.price), 0)
                  .toFixed(2)}{" "}
                €
              </p>
              <p>Delivery fee: {order.deliveryFee}</p>
              <p>Platform fee: {order.platformFee}</p>
              <p>Total: {order.totalPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatus;
