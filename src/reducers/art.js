import {
  SET_ART_LIST,
  REMOVE_ART_FROM_ART,
  SET_ARCHIVE_ART_LIST,
  SET_LAST_ART,
  CLEAR_ART_LIST,
} from "../action/action.type";

const initialState = {
  artList: [],
  archiveArtList: [],
  lastArt: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ART_LIST:
      const { artList } = state;

      const newArtList = Object.values(artList).concat(action.payload);

      return {
        ...state,
        artList: newArtList,
      };
    case CLEAR_ART_LIST:
      return {
        ...state,
        artList: [],
      };
    case SET_LAST_ART:
      return {
        ...state,
        lastArt: action.payload,
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
