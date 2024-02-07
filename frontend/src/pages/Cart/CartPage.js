import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import OrderContext from "../../OrderContext";

const CartPage = () => {
  const { orderID } = useContext(OrderContext);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const orderResponse = await axios.get(
          `http://127.0.0.1:8000/api/orders/${orderID.OrderID}/`
        );

        console.log(orderResponse.data); // Log order data to console

        setOrderDetails(orderResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [orderID]);

  const deleteMenuItem = async (OrderedMenuItemID) => {
    console.log(OrderedMenuItemID);
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/ordered-menu-items/${OrderedMenuItemID}/`
      );

      // Update order details
      const updatedOrderResponse = await axios.get(
        `http://127.0.0.1:8000/api/orders/${orderID.OrderID}/`
      );
      setOrderDetails(updatedOrderResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Order Details</h1>
      <p>Status: {orderDetails.OrderStatus}</p>
      <p>Date: {orderDetails.OrderDate}</p>
      <h2>Items:</h2>
      {orderDetails.OrderItems.map((item) => (
        <div key={item.OrderedMenuItemID}>
          <h3>{item.MenuName}</h3>
          <p>Type: {item.MenuTyp}</p>
          <p>Description: {item.MenuDesc}</p>
          <p>Price: {item.MenuPrice}</p>
          <p>Quantity: {item.QuantityOrdered}</p>
          <p>Total Price: {item.OrderedMenuItemPrice}</p>
          <button onClick={() => deleteMenuItem(item.OrderedMenuItemID)}>
            Delete
          </button>
        </div>
      ))}
      <h2>Total Order Price: {orderDetails.OrderPrice}</h2>
    </div>
  );
};

export default CartPage;
