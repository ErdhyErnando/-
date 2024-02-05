import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../../../UserContext";

const EditMenuUpdate = () => {
  const params = useParams(); // get the menu ID from the URL

  return <div>Client stuff: {JSON.stringify(params)}</div>;
};
export default EditMenuUpdate;
