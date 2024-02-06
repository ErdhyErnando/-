import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import axios from "axios";
import UserContext from "../../UserContext";
import styles from "../HomePage/HomePage.module.css"; // Import styles from HomePage
import { Link } from "react-router-dom";

export default function RestaurantDetail() {
  const { user } = useContext(UserContext);
  const { RestaurantID } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const restaurantResponse = await axios.get(
          `http://127.0.0.1:8000/api/restaurants/${RestaurantID}/`
        );
        setRestaurant(restaurantResponse.data);
        setMenu(restaurantResponse.data.MenuDetail || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, []);

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
          <div>
            <p>{restaurant.RestaurantAdresse}</p>
            <p>{restaurant.RestaurantPLZ}</p>
            <p>{restaurant.RestaurantTelefonNummer}</p>
            <p>Open: {restaurant.OpenHour}</p>
            <p>Close: {restaurant.CloseHour}</p>
          </div>
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
                <div>{item.MenuDescription}</div>
                <div>{item.MenuPrice}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
} // Add closing curly brace here
