import firebase from "firebase/app";
import { toast } from "react-toastify";

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

export const updateArtistProfileFun = (data) => async (dispatch) => {
  const { bio, dateOfBirth, dateStarted, name, profilePicUrl, uid } = data;
  console.log("data", bio, dateOfBirth, dateStarted, name, profilePicUrl, uid);

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
    })
    .then((res) => {
      toast("Profile Edite", {
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
