import React, { useEffect, useState, useContext } from "react";
import "./OrderStatus.css";
import Header from "../../components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../UserContext";

const OrderStatus = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const navigate = useNavigate();
  const [restaurantDetails, setRestaurantDetails] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [restaurant, setRestaurant] = useState({});
  const [orderIn, setOrderIn] = useState([]);
  const [menuIn, setMenuIn] = useState([]);
  const [acceptedMenuIn, setAcceptedMenuIn] = useState([]);
  const [acceptedOrderID, setAcceptedOrderID] = useState([]);
  const [rejectedMenuIn, setRejectedMenuIn] = useState([]);
  const [rejectedOrderID, setRejectedOrderID] = useState([]);
  const [deliveredMenuIn, setDeliveredMenuIn] = useState([]);
  const [deliveredOrderID, setDeliveredOrderID] = useState([]);

  const [menuDetails, setMenuDetails] = useState([]);

  const fetchDetails = async () => {
    try {
      const incomingOrders = await axios.post(
        `http://127.0.0.1:8000/api/orders/FilterCustomer/`,
        { Status: "Pending", CustomerID: user.CustomerID }
      );
      setOrderIn(incomingOrders.data);
      let menus = [];
      incomingOrders.data.forEach((order) => {
        menus = [...menus, ...order.OrderItems];
      });
      setMenuIn(menus);
      // console.log(menuIn.MenuName);
    } catch (error) {
      // if (error.response && error.response.status === 404) {
      setOrderIn([]);
      //   setMenuIn([]);
      // } else {
      console.error("Error fetching incoming orders: ", error);
    }
    // }

    try {
      const acceptedOrders = await axios.post(
        `http://127.0.0.1:8000/api/orders/FilterCustomer/`,
        { Status: "Accepted", CustomerID: user.CustomerID }
      );
      setAcceptedOrderID(acceptedOrders.data);
      let acceptedMenus = [];
      acceptedOrders.data.forEach((acceptedOrder) => {
        acceptedMenus = [...acceptedMenus, ...acceptedOrder.OrderItems];
      });
      setAcceptedMenuIn(acceptedMenus);
      // console.log(acceptedMenuIn.MenuName);
    } catch (error) {
      // if (error.response && error.response.status === 404) {
      setAcceptedOrderID([]);
      //   setMenuIn([]);
      // } else {
      console.error("Error fetching incoming orders: ", error);
    }
    // }

    try {
      const rejectedOrders = await axios.post(
        `http://127.0.0.1:8000/api/orders/FilterCustomer/`,
        { Status: "Rejected", CustomerID: user.CustomerID }
      );
      setRejectedOrderID(rejectedOrders.data);
      let rejectedMenus = [];
      rejectedOrders.data.forEach((rejectedOrder) => {
        rejectedMenus = [...rejectedMenus, ...rejectedOrder.OrderItems];
      });
      setRejectedMenuIn(rejectedMenus);
      // console.log(rejectedMenuIn.MenuName);
    } catch (error) {
      // if (error.response && error.response.status === 404) {
      setRejectedOrderID([]);
      //   setMenuIn([]);
      // } else {
      console.error("Error fetching incoming orders: ", error);
    }
    // }

    try {
      const deliveredOrders = await axios.post(
        `http://127.0.0.1:8000/api/orders/FilterCustomer/`,
        { Status: "Delivered", CustomerID: user.CustomerID }
      );
      setDeliveredOrderID(deliveredOrders.data);
      let deliveredMenus = [];
      deliveredOrders.data.forEach((deliveredOrder) => {
        deliveredMenus = [...deliveredMenus, ...deliveredOrder.OrderItems];
      });
      setDeliveredMenuIn(deliveredMenus);
      // console.log(deliveredMenuIn.MenuName);
    } catch (error) {
      setDeliveredOrderID([]);
      console.error("Error fetching delivered orders: ", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const backToHomePage = () => {
    navigate("/homepage");
  };

  return (
    <div className="restaurant-dashboard">
      <h1>Order Status</h1>

      <h2>Incoming Orders</h2>
      {orderIn.map((order, index) => (
        <div key={index} className="order">
          <h3>Delivery for Order ID: {order.OrderID}</h3>
          <p>Date of order: {order.OrderDate}</p>
          <p>
            Customer Name: {order.CustomerVorname} {order.CustomerNachname}
          </p>
          <p>Address: {order.CustomerAdresse}</p>
          <p>Customer 📞: {order.CustomerTelefonnummer}</p>
          {order.OrderItems.map((menu, index) => (
            <div key={index} className="menu">
              <p>Menu Name: {menu.MenuName}</p>
              <p>Menu Type: {menu.MenuTyp}</p>
              <p>Menu Quantity: {menu.QuantityOrdered}</p>
              <p>Menu Notes: {menu.OrderedMenuItemDesc}</p>
            </div>
          ))}
        </div>
      ))}

      <h2>Accepted Orders</h2>
      {acceptedOrderID.map((acceptedOrder, index) => (
        <div key={index} className="order">
          <h3>Delivery for Order ID: {acceptedOrder.OrderID}</h3>
          <p>Date of order: {acceptedOrder.OrderDate}</p>
          <p>
            Customer Name: {acceptedOrder.CustomerVorname}{" "}
            {acceptedOrder.CustomerNachname}
          </p>
          <p>Address: {acceptedOrder.CustomerAdresse}</p>
          <p>Customer 📞: {acceptedOrder.CustomerTelefonnummer}</p>
          {acceptedOrder.OrderItems.map((acceptedMenu, index) => (
            <div key={index} className="menu">
              <p>Menu Name: {acceptedMenu.MenuName}</p>
              <p>Menu Type: {acceptedMenu.MenuTyp}</p>
              <p>Menu Quantity: {acceptedMenu.QuantityOrdered}</p>
              <p>Menu Notes: {acceptedMenu.OrderedMenuItemDesc}</p>
            </div>
          ))}
        </div>
      ))}

      <h2>Order History</h2>

      {/* Rejected Orders */}
      <div>
        {rejectedOrderID.map((rejectedOrder, index) => (
          <div key={index} className="order">
            <h3>Delivery for Order ID: {rejectedOrder.OrderID}</h3>
            <h3>Status order: {rejectedOrder.OrderStatus}</h3>
            <p>Date of order: {rejectedOrder.OrderDate}</p>
            <p>
              Customer Name: {rejectedOrder.CustomerVorname}{" "}
              {rejectedOrder.CustomerNachname}
            </p>
            <p>Address: {rejectedOrder.CustomerAdresse}</p>
            <p>Customer 📞: {rejectedOrder.CustomerTelefonnummer}</p>
            {rejectedOrder.OrderItems.map((rejectedMenu, index) => (
              <div key={index} className="menu">
                <p>Menu Name: {rejectedMenu.MenuName}</p>
                <p>Menu Type: {rejectedMenu.MenuTyp}</p>
                <p>Menu Quantity: {rejectedMenu.QuantityOrdered}</p>
                <p>Menu Notes: {rejectedMenu.OrderedMenuItemDesc}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Delivered Orders */}
      <div>
        {deliveredOrderID.map((deliveredOrder, index) => (
          <div key={index} className="order">
            <h3>Delivery for Order ID: {deliveredOrder.OrderID}</h3>
            <h3>Status order: {deliveredOrder.OrderStatus}</h3>
            <p>Date of order: {deliveredOrder.OrderDate}</p>
            <p>
              Customer Name: {deliveredOrder.CustomerVorname}{" "}
              {deliveredOrder.CustomerNachname}
            </p>
            <p>Address: {deliveredOrder.CustomerAdresse}</p>
            <p>Customer 📞: {deliveredOrder.CustomerTelefonnummer}</p>
            {deliveredOrder.OrderItems.map((deliveredMenu, index) => (
              <div key={index} className="menu">
                <p>Menu Name: {deliveredMenu.MenuName}</p>
                <p>Menu Type: {deliveredMenu.MenuTyp}</p>
                <p>Menu Quantity: {deliveredMenu.QuantityOrdered}</p>
                <p>Menu Notes: {deliveredMenu.OrderedMenuItemDesc}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={() => fetchDetails()}>Refresh Status</button>
      <button>
        <Link to="/homepage">Return to Homepage</Link>
      </button>
    </div>
  );
};

export default OrderStatus;
