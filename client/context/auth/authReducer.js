import { SUCCESS_REGISTER, ERROR_REGISTER, CLEAN_ALERT } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case CLEAN_ALERT:
    case ERROR_REGISTER:
    case SUCCESS_REGISTER:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
