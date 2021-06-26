import {
  SET_ART_LIST,
  REMOVE_ART_FROM_ARTLIST,
  REMOVE_ART_FROM_ART,
  SET_ARCHIVE_ART_LIST,
} from "../action/action.type";

const initialState = {
  artList: [],
  archiveArtList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ART_LIST:
      return {
        ...state,
        artList: action.payload,
      };
    case SET_ARCHIVE_ART_LIST:
      return {
        ...state,
        archiveArtList: action.payload,
      };
    case REMOVE_ART_FROM_ART:
      if (action.payload.archiveValue === false) {
        const newList = state.archiveArtList.filter(
          (art) => art.artId !== action.payload.artId
        );
        return {
          ...state,
          archiveArtList: newList,
        };
      } else if (action.payload.archiveValue === true) {
        const newList = state.artList.filter(
          (art) => art.artId !== action.payload.artId
        );
        return {
          ...state,
          artList: newList,
        };
      } else return state;

    default:
      return state;
  }
};
