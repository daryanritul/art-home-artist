import {
  SET_ART_LIST,
  REMOVE_ART_FROM_ARTLIST,
  TOGGLE_ART_IS_ARCHIVE_FROM_ARTLIST,
} from "../action/action.type";

const initialState = {
  artList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ART_FROM_ARTLIST:
      const { artList } = state;

      return {
        ...state,
        artList: artList.filter((art) => art.artId !== action.payload),
      };

    case SET_ART_LIST:
      return {
        ...state,
        artList: action.payload,
      };
    case TOGGLE_ART_IS_ARCHIVE_FROM_ARTLIST:
      const newList = state.artList.map((art) => {
        if (art.artId === action.payload.artId) {
          return { ...art, isArchive: action.payload.archiveValue };
        } else {
          return { ...art };
        }
      });
      console.log("action.payload.isArchive", action.payload.archiveValue);
      return {
        ...state,
        artList: newList,
      };

    default:
      return state;
  }
};
