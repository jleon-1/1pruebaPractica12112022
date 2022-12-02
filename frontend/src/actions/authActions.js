import axios from "axios";
import setAuthToken from "../components/utils/setAuthToken";

import { SET_CURRENT_USER } from "./types";

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  console.log(userData);
  axios
    .get(`/usuarios/sesion/${userData.email}/${userData.contrasenia}`)
    .then((res) => {
      // Save to localStorage

      // Set token to localStorage
      console.log(res.data);
      const token = res.data;
      localStorage.setItem("jwtToken", JSON.stringify(token));
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      //const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(res.data));
    });
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
