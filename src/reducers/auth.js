import {
  SET_ARTIST_EMAIL,
  SET_ARTIST_PROFILE,
  SET_ARTIST_UID,
  SET_ISAUTHENTICATED,
  SET_IS_EMAIL_VERIFIED,
} from "../action/action.type";

const initialState = {
  isAuthenticated: false,
  email: null,
  isEmailVerified: false,
  artistProfile: {
    bio: "",
    dateOfBirth: null,
    dateStarted: null,
    name: "",
    profilePicUrl: null,
    social: [],
    socialID: "",
    socialLink: "",
    socialProviderName: "",
  },
  uid: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTIST_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case SET_ARTIST_PROFILE:
      return {
        ...state,
        artistProfile: action.payload,
      };
    case SET_ARTIST_UID:
      return {
        ...state,
        uid: action.payload,
      };

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
