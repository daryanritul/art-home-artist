import { combineReducers } from "redux";
import auth from "./auth";
import updateArtistProfile from "./updateArtistProfile";
import uploadArt from "./uploadArt";

export default combineReducers({
  auth,
  updateArtistProfile,
  uploadArt,
});
