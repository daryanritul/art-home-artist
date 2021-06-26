import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";
import { firebaseAuth, firestore, storage } from "../firebase";

import {
  CLEAR_UPDATE_ARTIST_PROFILE_STATE,
  SET_ARTIST_PROFILE,
  SET_ARTIST_PROFILE_PIC_UPLOAD_STATUS,
  SET_ARTIST_PROFILE_PIC_URL,
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

export const uploadProfileImageFun =
  ({ event, uid }) =>
  async (dispatch) => {
    const imageFile = event.target.files[0];

    const options = {
      maxSizeMB: 0.4,
      maxWidthOrHeight: 340,
      useWebWorker: true,
      fileType: "png",
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);

      var storageRef = storage.ref(uid + "/profilePic");
      const uploadTask = storageRef.put(compressedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          dispatch({
            type: SET_ARTIST_PROFILE_PIC_UPLOAD_STATUS,
            payload: "Upload is " + progress + "% done",
          });
        },
        (error) => {
          toast(error.message, {
            type: "error",
          });
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            dispatch({
              type: SET_ARTIST_PROFILE_PIC_URL,
              payload: downloadURL,
            });
          });
        }
      );
    } catch (error) {
      console.log(error);
      toast(error.message, {
        type: "error",
      });
    }
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
