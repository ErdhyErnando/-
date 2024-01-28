import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import RestaurantDetail from "./pages/RestaurantDetail/RestaurantDetail";
import FoodPage from "./pages/Food/FoodPage";
import CartPage from "./pages/Cart/CartPage";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import Login from "./pages/Login/Login";
import CreateAccountRestaurant from "./pages/CreateAccountRestaurant/CreateAccountRestaurant";
import LoginRestaurant from "./pages/LoginRestaurant/LoginRestaurant";
import HomePage from "./pages/HomePage/HomePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/restaurantdetail" element={<RestaurantDetail />} />
      <Route
        path="/restaurantoage/search/:searchTerm"
        element={<RestaurantDetail />}
      />
      <Route path="/restaurantdetail/tag/:tag" element={<RestaurantDetail />} />
      <Route path="/food/:id" element={<FoodPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/createaccount" element={<CreateAccount />} />
      <Route path="/loginrestaurant" element={<LoginRestaurant />} />
      <Route
        path="/createaccountrestaurant"
        element={<CreateAccountRestaurant />}
      />
      <Route path="/homepage" element={<HomePage />} />
    </Routes>
  );
}
