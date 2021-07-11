import { toast } from 'react-toastify';
import {
  SET_ARTIST_DATE_OF_BIRTH,
  SET_ARTIST_DATE_STARTED,
  SET_ARTIST_PROFILE_PIC_URL,
  SET_ARTIST_BIO,
  SET_ARTIST_NAME,
  SET_ARTIST_SOCIAL_LINK,
  SET_ARTIST_SOCIAL_PROVIDER_NAME,
  ADD_ARTIST_SOCIAL,
  CLEAR_UPDATE_ARTIST_PROFILE_STATE,
  SET_ARTIST_PROFILE_UPDATE_DATA,
  DELETE_ARTIST_SOCIAL,
  SET_ARTIST_PROFILE_PIC_UPLOAD_STATUS,
} from '../action/action.type';

const initialState = {
  bio: '',
  dateOfBirth: '',
  dateStarted: '',
  name: '',
  profilePicUrl: '',
  social: [],
  socialLink: '',
  socialProviderName: 'Facebook',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTIST_SOCIAL:
      const newArr = state.social;
      let socialProviderNamePresent = false;
      newArr.forEach((social) => {
        if (social.socialProviderName === state.socialProviderName) {
          toast("You Can't add Same Social Media twice", { type: 'warning' });
          socialProviderNamePresent = true;
        }
      });

      if (socialProviderNamePresent || !state.socialLink) {
        return state;
      } else {
        newArr.push({
          socialLink: state.socialLink,
          socialProviderName: state.socialProviderName,
        });
        return {
          ...state,
          social: newArr,
          socialLink: '',
          socialProviderName: 'Facebook',
        };
      }

    case DELETE_ARTIST_SOCIAL:
      const deleteArr = state.social;
      deleteArr.splice(action.payload, 1);

      return {
        ...state,
        social: deleteArr,
      };
    case CLEAR_UPDATE_ARTIST_PROFILE_STATE:
      return initialState;

    case SET_ARTIST_PROFILE_UPDATE_DATA:
      return { ...state, ...action.payload };

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
        profilePicUrl: action.payload,
      };
    case SET_ARTIST_PROFILE_PIC_UPLOAD_STATUS:
      return {
        ...state,
        profilePicUploadStatus: action.payload,
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
