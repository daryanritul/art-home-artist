import {
  ADD_ART_TAG,
  DELETE_ART_TAG,
  SET_ART_CATEGORY,
  SET_ART_DOWNLOAD_URL,
  SET_ART_NAME,
  SET_ART_IMAGE_URL,
  SET_ART_DESCRIPATION,
  SET_ART_LIST,
  CLEAR_UPDATE_ART_STATE,
} from "../action/action.type";

const initialState = {
  category: "",
  downloadUrl: "",
  description: "",
  artName: "",
  imageUrl: "",
  tag: [],
  artList: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ART_TAG:
      const newArr = state.tag;
      newArr.push(action.payload);
      return {
        ...state,
        tag: newArr,
      };
    case CLEAR_UPDATE_ART_STATE:
      return {
        ...state,
        category: "",
        downloadUrl: "",
        description: "",
        artName: "",
        imageUrl: "",
        tag: [],
      };
    case DELETE_ART_TAG:
      const deleteArr = state.tag;
      deleteArr.splice(action.payload, 1);

      return {
        ...state,
        tag: deleteArr,
      };
    case SET_ART_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case SET_ART_DOWNLOAD_URL:
      return {
        ...state,
        downloadUrl: action.payload,
      };

    case SET_ART_NAME:
      return {
        ...state,
        artName: action.payload,
      };
    case SET_ART_IMAGE_URL:
      return {
        ...state,
        imageUrl: action.payload,
      };
    case SET_ART_DESCRIPATION:
      return {
        ...state,
        description: action.payload,
      };
    case SET_ART_LIST:
      return {
        ...state,
        artList: action.payload,
      };

    default:
      return state;
  }
};
