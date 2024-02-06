import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import UserContext from "../../UserContext";
import axios from "axios";
import styles from "./HomePage.module.css";
// import StarRating from "../StarRating/StarRating";

export default function HomePage() {
  const [PLZ, setPLZ] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const customerResponse = await axios.get(
          `http://127.0.0.1:8000/api/customers/${user.CustomerID}/`
        );

        console.log(customerResponse.data); // Log owner data to console

        const customerPLZ = customerResponse.data.CustomerPLZ;
        console.log("CustomerPLZ:", customerPLZ);

        setPLZ(customerPLZ);

        const restaurantResponse = await axios.post(
          `http://127.0.0.1:8000/api/restaurants/FilterPLZ/`,
          { PLZ: customerPLZ }
        );

        console.log(restaurantResponse.data); // Log restaurant data to console

        setRestaurants(restaurantResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, []);

  console.log(PLZ); // Log PLZ to console

  return (
    <div>
      <Header />
      <div className={styles.centerContent}>
        <title>Home Page</title>
        <h2 className={styles.centerText}>Welcome, {user.CustomerVorname}!</h2>
        <h4 className={styles.centerText}>Your PLZ: {PLZ}</h4>
        <h4 className={styles.centerText}>Restaurants in your area:</h4>
        <ul className={styles.list}>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id} className={styles.listItem}>
              <Link to={`/restaurantdetail/${restaurant.RestaurantID}`}>
                <img
                  src={restaurant.RestaurantImage}
                  alt={restaurant.RestaurantName}
                  style={{
                    width: "300px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />

                <div className={styles.centeredText}>
                  <div>{restaurant.RestaurantName}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
