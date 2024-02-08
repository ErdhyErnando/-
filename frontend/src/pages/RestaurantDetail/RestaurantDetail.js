import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import axios from "axios";
import UserContext from "../../UserContext";
import styles from "../RestaurantDetail/restaurantDetails.module.css"; // Import styles from HomePage
import OrderContext from "../../OrderContext";

export default function RestaurantDetail() {
  const { user } = useContext(UserContext);
  const { RestaurantID } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [menu, setMenu] = useState([]);
  const { orderID } = useContext(OrderContext);
  const navigate = useNavigate();
  const [appetizerMenus, setAppetizerMenus] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const restaurantResponse = await axios.get(
          `http://127.0.0.1:8000/api/restaurants/${RestaurantID}/`
        );
        setRestaurant(restaurantResponse.data);
        setMenu(restaurantResponse.data.MenuDetail || []);
        console.log(restaurantResponse.data.MenuDetail || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, []);

  const handleDelete = (OrderID) => {
    const confirm = window.confirm(
      "WARNING! If you go back to homepage?, all of your items in the checkout page will be deleted."
    );
    if (confirm) {
      axios
        .delete(`http://127.0.0.1:8000/api/orders/${OrderID}/`)
        .catch((error) => console.log(error));
    }
    navigate("/homepage");
  };

  // const handleAppetizerClick = async () => {
  //   try {
  //     // Execute axios.post to filter the menus
  //     const responseAppetizer = await axios.post(
  //       "http://127.0.0.1:8000/api/menus/FilterType/",
  //       {
  //         MenuType: "Appetizer",
  //         RestaurantID: RestaurantID,
  //       }
  //     );
  //     setAppetizerMenus(responseAppetizer.data);

  //     // Execute axios.get to fetch the updated list of menus
  //     const response = await axios.get(
  //       `http://127.0.0.1:8000/api/restaurants/${RestaurantID}/`
  //     );

  //     // Update the state with the new list of menus
  //     setMenu(response.data.MenuDetail || []);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleAll = async () => {
    try {
      const restaurantResponse = await axios.get(
        `http://127.0.0.1:8000/api/restaurants/${RestaurantID}/`
      );
      setRestaurant(restaurantResponse.data);
      setMenu(restaurantResponse.data.MenuDetail || []);
      console.log(restaurantResponse.data.MenuDetail || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAppetizerClick = async () => {
    try {
      // Execute axios.post to filter the menus
      const responseAppetizer = await axios.post(
        `http://127.0.0.1:8000/api/menus/FilterType/`,
        {
          MenuType: "appetizer",
          RestaurantID: RestaurantID,
        }
      );
      // Update the state with the new list of menus
      setAppetizerMenus(responseAppetizer.data);
      console.log(responseAppetizer.data);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/restaurants/${RestaurantID}/`
      );
      // Update the state with the new list of menus
      setRestaurant(response.data);
      setMenu(responseAppetizer.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMainCourseClick = async () => {
    try {
      // Execute axios.post to filter the menus
      const responseAppetizer = await axios.post(
        `http://127.0.0.1:8000/api/menus/FilterType/`,
        {
          MenuType: "Main course",
          RestaurantID: RestaurantID,
        }
      );
      // Update the state with the new list of menus
      setAppetizerMenus(responseAppetizer.data);
      console.log(responseAppetizer.data);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/restaurants/${RestaurantID}/`
      );
      // Update the state with the new list of menus
      setRestaurant(response.data);
      setMenu(responseAppetizer.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDessertClick = async () => {
    try {
      // Execute axios.post to filter the menus
      const responseAppetizer = await axios.post(
        `http://127.0.0.1:8000/api/menus/FilterType/`,
        {
          MenuType: "dessert",
          RestaurantID: RestaurantID,
        }
      );
      // Update the state with the new list of menus
      setAppetizerMenus(responseAppetizer.data);
      console.log(responseAppetizer.data);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/restaurants/${RestaurantID}/`
      );
      // Update the state with the new list of menus
      setRestaurant(response.data);
      setMenu(responseAppetizer.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBeverageClick = async () => {
    try {
      // Execute axios.post to filter the menus
      const responseAppetizer = await axios.post(
        `http://127.0.0.1:8000/api/menus/FilterType/`,
        {
          MenuType: "Beverage",
          RestaurantID: RestaurantID,
        }
      );
      // Update the state with the new list of menus
      setAppetizerMenus(responseAppetizer.data);
      console.log(responseAppetizer.data);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/restaurants/${RestaurantID}/`
      );
      // Update the state with the new list of menus
      setRestaurant(response.data);
      setMenu(responseAppetizer.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.centerContent}>
        <h2 className={styles.centerText}>{restaurant.RestaurantName}</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <img
            src={restaurant.RestaurantImage}
            alt={restaurant.RestaurantName}
            style={{
              width: "300px",
              height: "150px",
              objectFit: "cover",
            }}
          />
          <div className={styles.detailsContainer}>
            <div className={styles.details}>
              <p>🏠{restaurant.RestaurantAdresse}</p>
              <p>📍{restaurant.RestaurantPLZ}</p>
              <p> ☎️{restaurant.RestaurantTelefonNummer}</p>
              <p> 📭 Open: {restaurant.OpenHour}</p>
              <p> 📪Close: {restaurant.CloseHour}</p>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button onClick={handleAll}>All</button>
          <button onClick={handleAppetizerClick}>Appetizer</button>
          <button onClick={handleMainCourseClick}>Main Course</button>
          <button onClick={handleDessertClick}>Dessert</button>
          <button onClick={handleBeverageClick}>Beverage</button>
        </div>
        <h4 className={styles.centerText}>Menu:</h4>
        <ul className={styles.list}>
          {menu.map((item) => (
            <li key={item.MenuID} className={styles.listItem}>
              <Link to={`/foodpage/${item.MenuID}`}>
                <img
                  src={item.MenuImage}
                  alt={item.MenuName}
                  style={{
                    width: "300px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </Link>
              <div className={styles.centeredText}>
                <div>{item.MenuName}</div>
                {/* <div>{item.MenuDescription}</div>
                <div>{item.MenuPrice}</div> */}
              </div>
            </li>
          ))}
        </ul>
        <div>
          <Link to="/cart">Checkout</Link>
        </div>
        <button
          className="btn btn-sm btn-danger"
          onClick={(e) => handleDelete(orderID.OrderID)}
          style={{ width: "80px", height: "30px" }}
        >
          Back to Homepage
        </button>
      </div>
    </>
  );
}
