import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
  SUCCESS_REGISTER,
  ERROR_REGISTER,
  CLEAN_ALERT,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  USER_AUTHENTICATED,
  SIGNOUT,
} from "../../types";

import clientAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = ({ children }) => {
  // Define initial state
  let initialState = {
    token:
      typeof window !== "undefined" ? localStorage.getItem("rsn-token") : "",
    authenticate: null,
    user: null,
    message: null,
  };
  // Define reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // functions

  // login

  const login = async (data) => {
    try {
      const result = await clientAxios.post("/api/auth", data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: result.data.token,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
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

  const authenticateUser = async () => {
    const token = localStorage.getItem("rsn-token");
    tokenAuth(token);
    try {
      const result = await clientAxios.get("/api/auth");
      console.log(result);
      dispatch({
        type: USER_AUTHENTICATED,
        payload: result.data.user,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });
    }
  };
  // register user

  const registerUser = async (data) => {
    try {
      const response = await clientAxios.post("/api/usuarios", data);
      dispatch({
        type: SUCCESS_REGISTER,
        payload: response.data.msg,
      });
    } catch (error) {
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

  const signout = () => {
    dispatch({
      type: SIGNOUT,
    });
  };

  let value = {
    token: state.token,
    authenticate: state.authenticate,
    user: state.user,
    message: state.message,
    authenticateUser,
    registerUser,
    login,
    signout,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthState;
