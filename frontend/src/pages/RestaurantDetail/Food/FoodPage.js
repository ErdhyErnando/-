import React, { useEffect, useState } from "react";
import classes from "./foodPage.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";

import Header from "../../../components/Header/Header";

export default function FoodPage() {
  const [food, setFood] = useState({});
  const { MenuID } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/menus/${MenuID}`)
      .then((response) => response.json())
      .then((data) => setFood(data))
      .catch((error) => console.error(error));
  }, [MenuID]);

  const handleAddToCart = () => {
    addToCart(food);
    navigate("/cart");
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

          <div className={classes.price}>
            <p>Price: {food.MenuPrice}</p>
          </div>

          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </>
  );
}
