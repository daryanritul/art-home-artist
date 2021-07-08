import { combineReducers } from "redux";
import auth from "./auth";
import updateArtistProfile from "./updateArtistProfile";
import art from "./art";
import addArt from "./addArt";
import { ARTIST_LOGGED_OUT } from "../action/action.type";

const appReducer = combineReducers({
  auth,
  updateArtistProfile,
  art,
  addArt,
});

export default (state, action) => {
  if (action.type === ARTIST_LOGGED_OUT) {
    state = undefined;
  }

  return appReducer(state, action);
};
