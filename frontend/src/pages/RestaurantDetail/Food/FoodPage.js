import React, { useEffect, useState, useContext } from "react";
import classes from "./foodPage.module.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import Header from "../../../components/Header/Header";
import Price from "../../../components/Price/Price";
import OrderContext from "../../../OrderContext";
import axios from "axios";

export default function FoodPage() {
  const [food, setFood] = useState({});
  const { MenuID } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { orderID } = useContext(OrderContext);
  const [description, setDescription] = useState("no description");
  const [quantity, setQuantity] = useState(1);
  console.log(orderID.OrderRestaurant);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/menus/${MenuID}`)
      .then((response) => response.json())
      .then((data) => setFood(data))
      .catch((error) => console.error(error));
  }, [MenuID]);

  const handleAddToCart = async () => {
    try {
      const orderedMenuItemData = {
        Order: orderID.OrderID,
        MenuOrdered: MenuID,
        OrderedMenuItemDesc: description,
        QuantityOrdered: quantity,
      };

      const response = await axios.post(
        `http://127.0.0.1:8000/api/ordered-menu-items/`,
        orderedMenuItemData
      );

      console.log(response.data);
      navigate(`/restaurantdetail/${orderID.OrderRestaurant}`);
    } catch (error) {
      console.error(error);
    }
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
          <div className={classes.description}>
            <label>
              Description:
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>

          <div className={classes.quantity}>
            <label>
              Quantity:
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </label>
          </div>

          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </>
  );
}
