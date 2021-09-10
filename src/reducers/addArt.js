import { toast } from 'react-toastify';
import {
  ADD_ART_TAG,
  DELETE_ART_TAG,
  SET_ART_CATEGORY,
  SET_ART_DOWNLOAD_URL,
  SET_ART_NAME,
  SET_ART_IMAGE_URL,
  SET_ART_DESCRIPATION,
  CLEAR_ADD_ART_STATE,
  SET_STATE_TO_UPDATE_ART,
  SET_ART_ID,
  SET_ART_DOWNLOAD_UPLOAD_STATUS,
  SET_ART_DOWNLOAD_NAME,
} from '../action/action.type';

const initialState = {
  category: '',
  downloadUrl: '',
  downloadName: '',
  downloadUploadStatus: '',
  description: '',
  artName: '',
  imageUrl: '',
  tag: [],
  artId: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ART_TAG:
      const newArr = state.tag;
      if (newArr.includes(action.payload.toLowerCase())) {
        toast("You Can't add same tag again and again", {
          type: 'warning',
        });
        return state;
      } else if (action.payload === '' || action.payload.includes(' ')) {
        toast("You can't Add Space in tag", {
          type: 'warning',
        });
        return state;
      } else {
        newArr.push(action.payload.toLowerCase());
        return {
          ...state,
          tag: newArr,
        };
      }

    case CLEAR_ADD_ART_STATE:
      return {
        ...state,
        category: '',
        downloadUrl: '',
        description: '',
        artName: '',
        imageUrl: '',
        artId: '',
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
    case SET_ART_DOWNLOAD_NAME:
      return {
        ...state,
        downloadName: action.payload,
      };
    case SET_ART_DOWNLOAD_UPLOAD_STATUS:
      return {
        ...state,
        downloadUploadStatus: action.payload,
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

    case SET_STATE_TO_UPDATE_ART:
      const {
        category,
        downloadUrl,
        description,
        artName,
        imageUrl,
        tag,
        artId,
      } = action.payload;
      return {
        ...state,
        category,
        downloadUrl,
        description,
        artName,
        imageUrl,
        tag,
        artId,
      };

    default:
      return state;
  }
};
