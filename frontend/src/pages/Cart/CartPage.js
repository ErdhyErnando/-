import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OrderContext from "../../OrderContext";
import styles from "./cartPage.module.css";
import Price from "../../components/Price/Price";

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
    <div className={styles.cartcontainer}>
      <header className={styles.cartheader}>
        <img
          src={restaurantDetails.RestaurantImage}
          alt="Restaurant"
          className={styles.restaurantlogo}
        />
        <div className={styles.restaurantinfo}>
          <h1 className={styles.restaurantname}>
            {restaurantDetails.RestaurantName}
          </h1>
          <p className={styles.restaurantaddress}>
            Address: {restaurantDetails.RestaurantAdresse},{" "}
            {restaurantDetails.RestaurantPLZ}
          </p>
          <p className={styles.telephonenumber}>
            Telephone Number: {restaurantDetails.RestaurantTelefonNummer}
          </p>
          <p className={styles.restauranthours}>
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
        <div key={item.OrderedMenuItemID} className={styles.orderitem}>
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

          <p className={styles.totalprice}>
            Total Price: <Price price={item.OrderedMenuItemPrice} />
          </p>
          <button
            onClick={() =>
              editMenuItem(
                item.OrderedMenuItemID,
                document.getElementById(`quantity-${item.OrderedMenuItemID}`)
                  .value,
                document.getElementById(`note-${item.OrderedMenuItemID}`).value
              )
            }
            className={styles.editButton}
          >
            Edit
          </button>
          <button
            onClick={() => deleteMenuItem(item.OrderedMenuItemID)}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      ))}
      <h2 className={styles.totalorderprice}>
        Total Order Price: <Price price={orderDetails.OrderPrice} />
      </h2>
      <div className={styles.cartfooter}>
        <Link to="/orderstatus">
          <button className={styles.checkoutButton}>Proceed to Checkout</button>
        </Link>
        <Link to={`/restaurantdetail/${orderID.OrderRestaurant}`}>
          <button className={styles.returntorestaurant}>
            Return to Restaurant
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
