import { toast } from "react-toastify";
import { firebaseAuth, firestore } from "../firebase";
import {
  CLEAR_UPDATE_ARTIST_PROFILE_STATE,
  SET_ARTIST_PROFILE,
} from "./action.type";

export const getArtistProfile = (data) => async (dispatch) => {
  const { uid } = data;

  const profileDoc = await firestore.collection("artist").doc(uid).get();

  if (profileDoc.exists) {
    dispatch({ type: SET_ARTIST_PROFILE, payload: profileDoc.data() });
  }
};

export const updateArtistProfileFun =
  ({ updateArtistProfile, uid, history }) =>
  async (dispatch) => {
    const { bio, dateOfBirth, dateStarted, name, profilePicUrl, social } =
      updateArtistProfile;
    firestore
      .collection("artist")
      .doc(uid)
      .update({
        bio,
        dateOfBirth,
        dateStarted,
        name,
        profilePicUrl,
        uid,
        social,
      })
      .then((res) => {
        toast("Profile Edite", {
          type: "success",
        });
        dispatch({ type: SET_ARTIST_PROFILE, payload: updateArtistProfile });
        dispatch({
          type: CLEAR_UPDATE_ARTIST_PROFILE_STATE,
        });
        history.push("/artistprofile");
      })
      .catch((error) => {
        console.log(error);
        toast(error.message, {
          type: "error",
        });
      });
  };

export const signIn = (data) => async (dispatch) => {
  console.log("data", data);
  const { email, password } = data;

  firebaseAuth
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      toast("Sign In", {
        type: "success",
      });
    })
    .catch((error) => {
      console.log(error);
      toast(error.message, {
        type: "error",
      });
    });
};
