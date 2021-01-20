import {
  ADD_DOWNLOADS,
  ADD_PASSWORD,
  CLEAN_ALERT,
  CLEAN_STATE,
  CREATE_LINK_SUCCESS,
  SHOW_ALERT,
  UPLOAD_FILE,
  UPLOAD_FILE_ERROR,
  UPLOAD_FILE_SUCCESS,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case CLEAN_ALERT:
    case SHOW_ALERT:
      return {
        ...state,
        message_file: action.payload,
      };
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        original_name: action.payload.original_name,
        loading: null,
      };
    case UPLOAD_FILE:
      return {
        ...state,
        loading: true,
      };

    case UPLOAD_FILE_ERROR:
      return {
        ...state,
        loading: null,
      };
    case CREATE_LINK_SUCCESS:
      return {
        ...state,
        url: action.payload,
      };
    case ADD_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case ADD_DOWNLOADS: {
      return {
        ...state,
        downloads: action.payload,
      };
    }
    case CLEAN_STATE:
      return {
        ...state,
        message_file: "",
        name: "",
        original_name: "",
        loading: null,
        downloads: 1,
        password: "",
        author: null,
        url: "",
      };
    default:
      return state;
  }
};
