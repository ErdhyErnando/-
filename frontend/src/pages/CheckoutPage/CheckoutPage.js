import React from "react";
import "./CheckoutPage.css"; // Make sure to create an accompanying CSS file for styling

const OrderSummary = () => {
  // Dummy data for the purpose of this example
  const orderDetails = {
    deliveryTime: "40-50 min",
    address: "Andrew Bernhardt, Otto-Keller-Straße 17, 47057 Duisburg",
    deliveryNotes: "",
    item: {
      name: "Winger Bucket Special",
      description: "7 Half Winger (3 Winger + 1 Half Winger)",
      price: 10.29,
      quantity: 1,
    },
    paymentSummary: {
      price: 10.29,
      deliveryFee: 2.49,
      platformFee: 1.49,
      total: 14.27,
    },
    walletBalance: 23.45,
  };

  // You can add state and handlers here to manage the quantity, notes, and other dynamic data.

  return (
    <div className="order-summary-container">
      <h1>Order Summary</h1>
      <div className="delivery-info">
        <p>
          <strong>Delivery</strong>
        </p>
        <p>Arriving in {orderDetails.deliveryTime}</p>
      </div>

      <div className="delivery-location">
        <p>{orderDetails.address}</p>
        <button>Add address details</button>
      </div>

      <textarea
        placeholder="e.g. Please leave food at the door/gate"
        value={orderDetails.deliveryNotes}
        // onChange handler to set delivery notes
      />

      <div className="item-details">
        <h2>{orderDetails.item.name}</h2>
        <p>{orderDetails.item.description}</p>
        <p>{orderDetails.item.price.toFixed(2)} €</p>
        {/* Quantity control could be implemented here */}
        <button>Add notes to your dish</button>
      </div>

      <div className="payment-summary">
        <h2>Payment Summary</h2>
        <p>Price: {orderDetails.paymentSummary.price.toFixed(2)} €</p>
        <p>
          Delivery fee: {orderDetails.paymentSummary.deliveryFee.toFixed(2)} €
        </p>
        <p>
          Platform fee: {orderDetails.paymentSummary.platformFee.toFixed(2)} €
        </p>
        <p>Total payment: {orderDetails.paymentSummary.total.toFixed(2)} €</p>
      </div>

      <div className="wallet-balance">
        <p>E-wallet balance</p>
        <p>{orderDetails.walletBalance.toFixed(2)} €</p>
        <button>Top up</button>
      </div>

      <button className="place-order-button">Place delivery order</button>
    </div>
  );
};

export default OrderSummary;
