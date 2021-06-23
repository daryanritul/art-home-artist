import {
  SET_ISAUTHENTICATED,
  SET_IS_EMAIL_VERIFIED,
} from "../action/action.type";

const initialState = {
  isEmailVerified: false,
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ISAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case SET_IS_EMAIL_VERIFIED:
      return {
        ...state,
        isEmailVerified: action.payload,
      };

    default:
      return state;
  }
};
