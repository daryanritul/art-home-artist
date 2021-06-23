import {
  ADD_ARTIST_SOCIAL,
  SET_ART_CATEGORY,
  SET_ART_DOWNLOAD_URL,
  SET_ART_IMAGE_NAME,
  SET_ART_IMAGE_URL,
} from "../action/action.type";

const initialState = {
  category: false,
  downloadUrl: false,
  imageName: false,
  imageUrl: false,
  tag: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
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

    case SET_ART_IMAGE_NAME:
      return {
        ...state,
        imageName: action.payload,
      };
    case SET_ART_IMAGE_URL:
      return {
        ...state,
        imageUrl: action.payload,
      };

    case ADD_ARTIST_SOCIAL:
      const newArr = state.tag;
      newArr.push(action.payload);
      return {
        ...state,
        tag: newArr,
      };

    default:
      return state;
  }
};
