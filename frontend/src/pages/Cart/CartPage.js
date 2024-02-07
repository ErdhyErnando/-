import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OrderContext from "../../OrderContext";
import "./cartPage.module.css";

const CartPage = () => {
  const { orderID } = useContext(OrderContext);
  const [orderDetails, setOrderDetails] = useState(null);

  const [restaurantDetails, setRestaurantDetails] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const orderResponse = await axios.get(
          `http://127.0.0.1:8000/api/orders/${orderID.OrderID}/`
        );

        console.log(orderResponse.data); // Log order data to console

        setOrderDetails(orderResponse.data);

        // Fetch restaurant details
        const restaurantResponse = await axios.get(
          `http://127.0.0.1:8000/api/restaurants/${orderID.OrderRestaurant}/`
        );

        console.log(restaurantResponse.data); // Log restaurant data to console

        setRestaurantDetails(restaurantResponse.data);
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

  const editMenuItem = async (OrderedMenuItemID, newQuantity, newNote) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/ordered-menu-items/${OrderedMenuItemID}/`,
        {
          QuantityOrdered: newQuantity,
          OrderedMenuItemDesc: newNote,
        }
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
    <div className="cart-container">
      <header className="cart-header">
        <img
          src={restaurantDetails.RestaurantImage}
          alt="Restaurant"
          className="restaurant-logo"
        />
        <div className="restaurant-info">
          <h1 className="restaurant-name">
            {restaurantDetails.RestaurantName}
          </h1>
          <p className="restaurant-address">
            Address: {restaurantDetails.RestaurantAdresse},{" "}
            {restaurantDetails.RestaurantPLZ}
          </p>
          <p className="telephone-number">
            Telephone Number: {restaurantDetails.RestaurantTelefonNummer}
          </p>
          <p className="restaurant-hours">
            Opens at: {restaurantDetails.OpenHour} - Closes at:{" "}
            {restaurantDetails.CloseHour}
          </p>
        </div>
      </header>

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
          <input
            type="number"
            defaultValue={item.QuantityOrdered}
            id={`quantity-${item.OrderedMenuItemID}`}
          />
          <p>Note: {item.OrderedMenuItemDesc}</p>
          <input
            type="text"
            defaultValue={item.OrderedMenuItemDesc}
            id={`note-${item.OrderedMenuItemID}`}
          />

          <p>Total Price: {item.OrderedMenuItemPrice}</p>
          <button onClick={() => deleteMenuItem(item.OrderedMenuItemID)}>
            Delete
          </button>
          <button
            onClick={() =>
              editMenuItem(
                item.OrderedMenuItemID,
                document.getElementById(`quantity-${item.OrderedMenuItemID}`)
                  .value,
                document.getElementById(`note-${item.OrderedMenuItemID}`).value
              )
            }
          >
            Edit
          </button>
        </div>
      ))}
      <h2>Total Order Price: {orderDetails.OrderPrice}</h2>
      <Link to="/orderstatus">
        <button>Proceed to Checkout</button>
      </Link>
      <Link to={`/restaurantdetail/${orderID.OrderRestaurant}`}>
        <button>Return to Restaurant</button>
      </Link>
    </div>
  );
};

export default CartPage;
