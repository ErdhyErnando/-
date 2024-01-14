import React, { useEffect, useReducer } from "react";
import Search from "../../components/Header/Search/Search";
import Thumbnails from "../../components/Header/Thumbnails/Thumbnails";
import { getAll, search } from "../../services/foodService";
import { useParams } from "react-router-dom";

const initialState = { foods: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FOODS_LOADED":
      return { ...state, foods: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods } = state;
  const { searchTerm } = useParams();

  useEffect(() => {
    const loadedFoods = searchTerm ? search(searchTerm) : getAll();

    loadedFoods.then((foods) =>
      dispatch({ type: "FOODS_LOADED", payload: foods })
    );
  }, [searchTerm]);

  return (
    <>
      <Search />
      <Thumbnails foods={foods} />
    </>
  );
}
