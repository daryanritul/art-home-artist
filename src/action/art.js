import firebase from "firebase/app";
import { toast } from "react-toastify";
import { CLEAR_UPDATE_ART_STATE } from "./action.type";

export const addArtFun =
  ({
    category,
    downloadUrl,
    description,
    artName,
    imageUrl,
    tag,
    uid,
    history,
  }) =>
  async (dispatch) => {
    firebase
      .firestore()
      .collection("artist")
      .doc(uid)
      .collection("art")
      .doc()
      .set({
        artistUid: uid,
        category,
        downloadUrl,
        description,
        artName,
        imageUrl,
        tag,
      })
      .then((res) => {
        toast("Art Added", {
          type: "success",
        });
        dispatch({
          type: CLEAR_UPDATE_ART_STATE,
        });
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast(error.message, {
          type: "error",
        });
      });
  };
