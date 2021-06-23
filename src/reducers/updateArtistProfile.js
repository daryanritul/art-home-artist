import {
  SET_ARTIST_DATE_OF_BIRTH,
  SET_ARTIST_DATE_STARTED,
  SET_ARTIST_PROFILE_PIC_URL,
  SET_ARTIST_BIO,
  SET_ARTIST_NAME,
  SET_ARTIST_SOCIAL_LINK,
  SET_ARTIST_SOCIAL_PROVIDER_NAME,
  SET_ARTIST_SOCIAL_ID,
  ADD_ARTIST_SOCIAL,
} from "../action/action.type";

const initialState = {
  bio: "",
  dateOfBirth: null,
  dateStarted: null,
  name: "",
  profilePic_Url: null,
  social: [],
  socialID: "",
  socialLink: "",
  socialProviderName: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTIST_BIO:
      return {
        ...state,
        bio: action.payload,
      };
    case SET_ARTIST_DATE_OF_BIRTH:
      return {
        ...state,
        dateOfBirth: action.payload,
      };
    case SET_ARTIST_DATE_STARTED:
      return {
        ...state,
        dateStarted: action.payload,
      };

    case SET_ARTIST_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case SET_ARTIST_PROFILE_PIC_URL:
      return {
        ...state,
        profilePic_Url: action.payload,
      };

    case ADD_ARTIST_SOCIAL:
      const newArr = state.social;
      newArr.push(action.payload);
      return {
        ...state,
        social: newArr,
      };
    case SET_ARTIST_SOCIAL_ID:
      return {
        ...state,
        socialID: action.payload,
      };
    case SET_ARTIST_SOCIAL_LINK:
      return {
        ...state,
        socialLink: action.payload,
      };
    case SET_ARTIST_SOCIAL_PROVIDER_NAME:
      return {
        ...state,
        socialProviderName: action.payload,
      };

    default:
      return state;
  }
};
