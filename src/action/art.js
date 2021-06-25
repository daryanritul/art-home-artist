import { toast } from "react-toastify";
import { firestore, fireStoreTimestamp } from "../firebase";
import { CLEAR_UPDATE_ART_STATE, SET_ART_LIST } from "./action.type";

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
    firestore
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

export const updateArtFun =
  ({
    category,
    downloadUrl,
    description,
    artName,
    imageUrl,
    tag,
    artId,
    uid,
    history,
  }) =>
  async (dispatch) => {
    try {
      console.log("Update Fun indisn");
      console.log("artId", artId);
      console.log("uid", uid);
      if (artId && uid) {
        console.log("Update Fun IFF");
        await firestore
          .collection("artist")
          .doc(uid)
          .collection("art")
          .doc(artId)
          .set({
            artistUid: uid,
            category,
            downloadUrl,
            description,
            artName,
            imageUrl,
            tag,
            timeStamp: fireStoreTimestamp,
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
      } else {
        toast("We Dont Recive Art id .... Please Try agnain", {
          type: "error",
        });
        history.push("/");
      }
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
  };

export const getArtListFun =
  ({ uid }) =>
  async (dispatch) => {
    const snapshot = await firestore
      .collection("artist")
      .doc(uid)
      .collection("art")
      .get();

    const tempDoc = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    dispatch({ type: SET_ART_LIST, payload: tempDoc });

    if (snapshot.empty) {
      toast.warn("🦄 No Post Found!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
