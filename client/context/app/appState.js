import React, { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";
import {
  SHOW_ALERT,
  CLEAN_ALERT,
  UPLOAD_FILE_ERROR,
  UPLOAD_FILE_SUCCESS,
  CREATE_LINK_ERROR,
  CREATE_LINK_SUCCESS,
  UPLOAD_FILE,
} from "../../types";
import clientAxios from "../../config/axios";

const AppState = ({ children }) => {
  const initialState = {
    message_file: "",
    name: "",
    original_name: "",
    loading: null,
    downloads: 1,
    password: "",
    author: null,
    url: "",
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  //Show alert
  const showAlert = (msg) => {
    dispatch({
      type: SHOW_ALERT,
      payload: msg,
    });

    setTimeout(() => {
      dispatch({
        type: CLEAN_ALERT,
        payload: "",
      });
    }, 3000);
  };

  //upload files to server

  const uploadFile = async (formData, fileName) => {
    dispatch({
      type: UPLOAD_FILE,
    });
    try {
      const result = await clientAxios.post("/api/archivos", formData);
      dispatch({
        type: UPLOAD_FILE_SUCCESS,
        payload: {
          name: result.data.archivo,
          original_name: fileName,
        },
      });
      console.log(result);
    } catch (error) {
      console.log(error);

      dispatch({
        type: UPLOAD_FILE_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  const createLink = async () => {
    const data = {
      name: state.name,
      original_name: state.original_name,
      downloads: state.downloads,
      password: state.password,
    };

    try {
      const result = await clientAxios.post("/api/enlaces", data);
      dispatch({
        type: CREATE_LINK_SUCCESS,
        payload: result.data.msg,
      });
    } catch (error) {
      console.log(error);
    }
  };

  let value = {
    message_file: state.message_file,
    name: state.name,
    original_name: state.original_name,
    loading: state.loading,
    downloads: state.downloads,
    password: state.password,
    author: state.author,
    url: state.url,
    showAlert,
    uploadFile,
    createLink,
  };
  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export default AppState;
