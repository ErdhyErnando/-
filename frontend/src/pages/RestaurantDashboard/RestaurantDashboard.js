import React, { useState, useEffect, useContext } from "react";
import "./RestaurantDashboard.css";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserContext";
import axios from "axios";

const RestaurantDashboard = () => {
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
  const navigate = useNavigate();

  const fetchDetails = async () => {
    try {
      const ownerResponse = await axios.get(
        `http://127.0.0.1:8000/api/owners/${user.OwnerID}/`
      );
      // console.log(ownerResponse.data);
      const restaurantResponse = await axios.get(
        `http://127.0.0.1:8000/api/restaurants/${ownerResponse.data.RestaurantID}/`
      );
      setRestaurant(restaurantResponse.data);

      try {
        const incomingOrders = await axios.post(
          `http://127.0.0.1:8000/api/orders/FilterStatus/`,
          { Status: "Pending", RestaurantID: user.RestaurantID }
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
          `http://127.0.0.1:8000/api/orders/FilterStatus/`,
          { Status: "Accepted", RestaurantID: user.RestaurantID }
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
          `http://127.0.0.1:8000/api/orders/FilterStatus/`,
          { Status: "Rejected", RestaurantID: user.RestaurantID }
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
          `http://127.0.0.1:8000/api/orders/FilterStatus/`,
          { Status: "Delivered", RestaurantID: user.RestaurantID }
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
    } catch (error) {
      // if (error.response && error.response.status === 404) {
      //   setMenuIn([]);
      // } else {
      console.error("Error fetching incoming orders: ", error);
    }
    // }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleLogout = async () => {
    try {
      // Call the logout API
      await axios.post("http://127.0.0.1:8000/api/customers/logout/");

      // console.log("User logged out successfully");

      // Clear the user data when logging out
      setUser(null);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const pendingToAccepted = async (choosen) => {
    console.log(choosen);
    try {
      const getOrder = await axios.get(
        `http://127.0.0.1:8000/api/orders/${choosen}/`
      );
      fetchDetails();

      await axios.put(`http://127.0.0.1:8000/api/orders/${choosen}/`, {
        OrderStatus: "Accepted",
        OrderCustomer: getOrder.data.OrderCustomer,
        OrderRestaurant: getOrder.data.OrderRestaurant,
        OrderPrice: getOrder.data.OrderPrice,
      });

      fetchDetails();
    } catch (error) {
      console.error(error);
    }
  };

  const pendingToRejected = async (choosen) => {
    console.log(choosen);
    try {
      const getOrder = await axios.get(
        `http://127.0.0.1:8000/api/orders/${choosen}/`
      );
      fetchDetails();

      await axios.put(`http://127.0.0.1:8000/api/orders/${choosen}/`, {
        OrderStatus: "Rejected",
        OrderCustomer: getOrder.data.OrderCustomer,
        OrderRestaurant: getOrder.data.OrderRestaurant,
        OrderPrice: getOrder.data.OrderPrice,
      });

      fetchDetails();
    } catch (error) {
      console.error(error);
    }
  };

  const acceptedToDelivered = async (choosen) => {
    console.log(choosen);
    try {
      const getOrder = await axios.get(
        `http://127.0.0.1:8000/api/orders/${choosen}/`
      );
      fetchDetails();

      await axios.put(`http://127.0.0.1:8000/api/orders/${choosen}/`, {
        OrderStatus: "Delivered",
        OrderCustomer: getOrder.data.OrderCustomer,
        OrderRestaurant: getOrder.data.OrderRestaurant,
        OrderPrice: getOrder.data.OrderPrice,
      });

      fetchDetails();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditMenu = () => {
    navigate("/restaurantdashboard/edit");
  };

  // console.log(restaurant.RestaurantImage);

  return (
    <div className="restaurant-dashboard">
      <h1>Restaurant Dashboard</h1>
      <div
        className="restaurant-details"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div
          style={{
            width: "300px",
            height: "200px",
            overflow: "hidden",
            marginRight: "20px",
            marginTop: "40px",
          }}
        >
          <img
            src={restaurant.RestaurantImage}
            alt={restaurant.RestaurantName}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div>
          <h2>{restaurant.RestaurantName}</h2>
          <p>
            🏠 {restaurant.RestaurantAdresse}, {restaurant.RestaurantPLZ}
          </p>
          <p>📞 {restaurant.RestaurantTelefonNummer}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px",
            }}
          >
            <button onClick={handleEditMenu} style={{ marginRight: "10px" }}>
              Edit Menu
            </button>
            <button onClick={handleLogout}>Log out</button>
          </div>
        </div>
      </div>

      <hr />

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
          <button onClick={() => pendingToRejected(order.OrderID)}>
            Reject Order
          </button>
          <button onClick={() => pendingToAccepted(order.OrderID)}>
            Accept Order
          </button>
        </div>
      ))}

      <hr />

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
          <button onClick={() => acceptedToDelivered(acceptedOrder.OrderID)}>
            To be Delivered
          </button>
        </div>
      ))}

      <hr />

      <div className="order-status-page">
        <h2>Order History</h2>
        <div className="order-history">
          {/* Rejected Orders */}
          <div className="rejected-orders">
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
          </div>

          {/* Delivered Orders */}
          <div className="delivered-orders">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
