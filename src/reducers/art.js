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
  SET_STATE_TO_UPDATE_ART,
  SET_ART_ID,
  REMOVE_ART_FROM_ARTLIST,
} from "../action/action.type";

const initialState = {
  category: "",
  downloadUrl: "",
  description: "",
  artName: "",
  imageUrl: "",
  tag: [],
  artList: [],
  artId: "",
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
        artId: "",
        tag: [],
      };
    case DELETE_ART_TAG:
      const deleteArr = state.tag;
      deleteArr.splice(action.payload, 1);

      return {
        ...state,
        tag: deleteArr,
      };

    case REMOVE_ART_FROM_ARTLIST:
      const { artList } = state;
      return {
        ...state,
        artList: artList.filter((art) => art.artId !== action.payload),
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
    case SET_ART_ID:
      return {
        ...state,
        artId: action.payload,
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
    case SET_STATE_TO_UPDATE_ART:
      const { category, downloadUrl, description, artName, imageUrl, tag, id } =
        action.payload;
      return {
        ...state,
        category,
        downloadUrl,
        description,
        artName,
        imageUrl,
        tag,
        artId: id,
      };

    default:
      return state;
  }
};
