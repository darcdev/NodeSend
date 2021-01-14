import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import { SUCCESS_REGISTER, ERROR_REGISTER, CLEAN_ALERT } from "../../types";

import clientAxios from "../../config/axios";

const AuthState = ({ children }) => {
  // Define initial state
  let initialState = {
    token: "",
    authenticate: null,
    user: null,
    message: null,
  };
  // Define reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // functions
  // register user

  const registerUser = async (data) => {
    try {
      const response = await clientAxios.post("/api/usuarios", data);
      dispatch({
        type: SUCCESS_REGISTER,
        payload: response.data.msg,
      });
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: ERROR_REGISTER,
        payload: error.response.data.msg,
      });
    }

    setTimeout(() => {
      dispatch({
        type: CLEAN_ALERT,
        payload: null,
      });
    }, 3000);
  };
  const userAuthenticated = (name) => {
    dispatch({
      type: USER_AUTHENTICATED,
      payload: name,
    });
  };

  let value = {
    token: state.token,
    authenticate: state.authenticate,
    user: state.user,
    message: state.message,
    userAuthenticated,
    registerUser,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthState;
