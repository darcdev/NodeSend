import {
  SUCCESS_REGISTER,
  ERROR_REGISTER,
  CLEAN_ALERT,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  USER_AUTHENTICATED,
  SIGNOUT,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case CLEAN_ALERT:
    case ERROR_REGISTER:
    case SUCCESS_REGISTER:
    case LOGIN_ERROR:
      return {
        ...state,
        message: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("rsn-token", action.payload);
      return {
        ...state,
        token: action.payload,
        authenticate: true,
      };
    case USER_AUTHENTICATED:
      return {
        ...state,
        user: action.payload,
        authenticate: true,
      };
    case SIGNOUT:
      localStorage.removeItem("rsn-token");
      return {
        ...state,
        user: null,
        token: null,
        authenticate: null,
      };
    default:
      return state;
  }
};
