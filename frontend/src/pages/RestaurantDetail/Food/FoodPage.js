import React, { useEffect, useState } from "react";
import classes from "./foodPage.module.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import Header from "../../../components/Header/Header";
import Price from "../../../components/Price/Price";

export default function FoodPage() {
  const [food, setFood] = useState({});
  const { MenuID } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const { RestaurantID } = food;

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/menus/${MenuID}`)
      .then((response) => response.json())
      .then((data) => setFood(data))
      .catch((error) => console.error(error));
  }, [MenuID]);

  const handleAddToCart = () => {
    addToCart(MenuID, RestaurantID);
    navigate(`/cart/${RestaurantID}`);
  };

  return (
    <>
      <Header />
      <div className={classes.container}>
        <img
          className={classes.image}
          src={food.MenuImage}
          alt={food.MenuName}
        />
        <div className={classes.details}>
          <div className={classes.header}>
            <span className={classes.name}>{food.MenuName}</span>
          </div>
          <div className={classes.description}>
            <span className={classes.description}>{food.MenuDescription}</span>
          </div>

          <div className={classes.price}>
            <Price price={food.MenuPrice} />
          </div>

          <button onClick={handleAddToCart}>
            <Link to={`/cart/${RestaurantID}`}> Add to Cart</Link>
          </button>
        </div>
      </div>
    </>
  );
}
