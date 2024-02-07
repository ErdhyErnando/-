import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const CartContext = createContext(null);
const CART_KEY = "cart";
const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export default function CartProvider({ children }) {
  const initCart = getCartFromLocalStorage();
  const [cartItems, setCartItems] = useState(initCart.items);
  const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
  const [totalCount, setTotalCount] = useState(initCart.totalCount);

  useEffect(() => {
    const totalPrice = sum(
      cartItems.map((item) => item.MenuPrice * item.quantity)
    );
    const totalCount = sum(cartItems.map((item) => item.quantity));

    setTotalPrice(totalPrice);
    setTotalCount(totalCount);

    localStorage.setItem(
      CART_KEY,
      JSON.stringify({
        items: cartItems,
        totalPrice,
        totalCount,
      })
    );
  }, [cartItems]);

  function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
  }

  const sum = (items) => {
    return items.reduce((prevValue, curValue) => prevValue + curValue, 0);
  };

  const removeFromCart = (MenuID) => {
    const filteredCartItems = cartItems.filter(
      (item) => item.MenuID !== MenuID
    );
    setCartItems(filteredCartItems);
  };

  const changeQuantity = (cartItem, newQuantity) => {
    const changedCartItem = {
      ...cartItem,
      quantity: newQuantity,
      MenuPrice: cartItem.MenuPrice * newQuantity,
    };

    setCartItems(
      cartItems.map((item) =>
        item.MenuID === cartItem.MenuID ? changedCartItem : item
      )
    );
  };

  // const addToCart = (menu) => {
  //   const cartItem = cartItems.find((item) => item.MenuID === menu.MenuID);
  //   if (cartItem) {
  //     changeQuantity(cartItem, cartItem.quantity + 1);
  //   } else {
  //     setCartItems([...cartItems, { ...menu, quantity: 1 }]);
  //   }
  // };

  const addToCart = async (MenuID) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/menus/${MenuID}/`
      );
      const menu = response.data;
      const RestaurantID = menu.RestaurantID; // Get RestaurantID from the API response

      // Check if the cart already contains items from a different restaurant
      const itemsFromDifferentRestaurant = cartItems.find(
        (item) => item.RestaurantID !== RestaurantID
      );

      // If the cart contains items from a different restaurant, remove those items
      if (itemsFromDifferentRestaurant) {
        setCartItems([]);
      }

      const cartItem = cartItems.find((item) => item.MenuID === menu.MenuID);
      if (cartItem) {
        changeQuantity(cartItem, cartItem.quantity + 1);
      } else {
        const newCartItem = {
          MenuID: menu.MenuID,
          MenuName: menu.MenuName,
          MenuPrice: menu.MenuPrice,
          MenuImage: menu.MenuImage,
          quantity: 1,
          RestaurantID,
        };
        setCartItems([...cartItems, newCartItem]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount },
        removeFromCart,
        changeQuantity,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
