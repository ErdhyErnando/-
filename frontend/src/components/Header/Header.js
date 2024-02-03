import React, { useContext } from "react";
import classes from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import UserContext from "../../UserContext"; // import UserContext

export default function Header() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext); // use UserContext

  console.log(user.CustomerVorname); // log the user object

  const logout = () => {
    setUser(null); // clear the user data when logging out
    navigate("/");
  };

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          Lieferspatz!
        </Link>
        <nav>
          <ul>
            {user ? (
              <li className={classes.menu_container}>
                <Link to="/login">{user.CustomerVorname}</Link>
                <div className={classes.menu}>
                  <Link to="/orderstatus">Orders</Link>
                  <a onClick={logout}>Logout</a>
                </div>
              </li>
            ) : (
              <Link to="/login">Login</Link>
            )}

            <li>
              <Link to="/cart">
                Cart
                {cart.totalCount > 0 && (
                  <span className={classes.cart_count}>{cart.totalCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
