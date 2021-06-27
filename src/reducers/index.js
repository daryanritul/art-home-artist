import { combineReducers } from "redux";
import auth from "./auth";
import updateArtistProfile from "./updateArtistProfile";
import art from "./art";
import addArt from "./addArt";
import chat from "./chat";

export default combineReducers({
  auth,
  updateArtistProfile,
  art,
  addArt,
  chat,
});
