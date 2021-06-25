import firebase from "firebase/app";
import { toast } from "react-toastify";
import {
  CLEAR_UPDATE_ARTIST_PROFILE_STATE,
  SET_ARTIST_PROFILE,
} from "./action.type";

export const getArtistProfile = (data) => async (dispatch) => {
  const { uid } = data;
  console.log("FUN getArtistProfileC", data);

  await firebase
    .firestore()
    .collection("artist")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.data()) {
        dispatch({ type: SET_ARTIST_PROFILE, payload: doc.data() });
      }
    });
};

export const updateArtistProfileFun =
  ({ updateArtistProfile, uid, history }) =>
  async (dispatch) => {
    const { bio, dateOfBirth, dateStarted, name, profilePicUrl, social } =
      updateArtistProfile;

    firebase
      .firestore()
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

  firebase
    .auth()
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
