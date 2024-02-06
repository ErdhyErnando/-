import React, { useEffect, useContext, useState } from "react";
import Thumbnails from "../../components/ThumbnailsRestaurant/ThumbnailsRestaurant";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
// import NotFound from "../../components/NotFound/NotFound";
import UserContext from "../../UserContext";
import axios from "axios";

export default function HomePage() {
  // const { CustomerID } = useParams();
  const [PLZ, setPLZ] = useState({});
  const { user } = useContext(UserContext);
  // const [restaurants, setRestaurants] = useState([]);

  // const [values, setValues] = useState({
  //   CustomerVorname: "",
  //   CustomerNachname: "",
  //   CustomerPasswort: "",
  //   CustomerEmail: "",
  //   CustomerTelefonNummer: "",
  //   CustomerAdresse: "",
  //   CustomerPLZ: "",
  // });

  // const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const customerResponse = await axios.get(
          `http://127.0.0.1:8000/api/customers/${user.CustomerID}/`
        );

        console.log(customerResponse.data); // Log owner data to console
        // const plzResponse = await axios.get(
        //   `http://127.0.0.1:8000/api/customers/${customerResponse.data.CustomerPLZ}/`
        // );

        const customerPLZ = customerResponse.data.CustomerPLZ;
        console.log("CustomerPLZ:", customerPLZ);

        // setPLZ(plzResponse.data);
        setPLZ(customerPLZ);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, []);

  console.log(PLZ.data);

  return (
    <>
      <Header />
      {/* <Search />
      <Tags tags={tags} />
      {foods.length === 0 && <NotFound linkText="Reset Search" />} */}
      {/* <Thumbnails foods={foods} /> */}
    </>
  );
}
