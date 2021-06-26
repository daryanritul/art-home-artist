import { toast } from "react-toastify";
import { firestore, fireStoreTimestamp } from "../firebase";
import {
  CLEAR_ADD_ART_STATE,
  REMOVE_ART_FROM_ARTLIST,
  SET_ART_LIST,
  REMOVE_ARCHIVE_ART_FROM_ART,
  SET_ARCHIVE_ART_LIST,
} from "./action.type";

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
    artistProfile,
  }) =>
  async (dispatch) => {
    firestore
      .collection("art")
      .doc()
      .set({
        uid,
        category,
        downloadUrl,
        description,
        artName,
        imageUrl,
        timeStamp: fireStoreTimestamp,
        tag,
        isArchive: false,
        artistProfile: {
          name: artistProfile.name,
          profilePicUrl: artistProfile.profilePicUrl,
          dateStarted: artistProfile.dateStarted,
        },
      })
      .then(() => {
        toast("Art Added", {
          type: "success",
        });
        dispatch({
          type: CLEAR_ADD_ART_STATE,
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
    artistProfile,
    history,
  }) =>
  async (dispatch) => {
    try {
      if (artId && uid) {
        await firestore
          .collection("art")
          .doc(artId)
          .update({
            uid,
            category,
            downloadUrl,
            description,
            artName,
            imageUrl,
            tag,
            timeStamp: fireStoreTimestamp,
            artistProfile: {
              name: artistProfile.name,
              profilePicUrl: artistProfile.proprofilePicUrlfilePic,
              dateStarted: artistProfile.dateStarted,
            },
          })
          .then(() => {
            toast("Art Added", {
              type: "success",
            });
            dispatch({
              type: CLEAR_ADD_ART_STATE,
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

export const deleteArtFun =
  ({ artId }) =>
  async (dispatch) => {
    await firestore
      .collection("art")
      .doc(artId)
      .delete()
      .then(() => {
        toast("Art Delete", {
          type: "success",
        });
        dispatch({ type: REMOVE_ART_FROM_ARTLIST, payload: artId });
      })
      .catch((error) => {
        console.log(error);
        toast(error.message, {
          type: "error",
        });
      });
  };

export const getArtListFun =
  ({ uid, history, tagFilter, categoryFilter }) =>
  async (dispatch) => {
    try {
      if (uid) {
        const artList = firestore
          .collection("art")
          .where("uid", "==", uid)
          .where("isArchive", "==", false);

        if (uid && tagFilter === "" && categoryFilter === "") {
          console.log("if 1");
          const snapshot = await artList.orderBy("timeStamp", "desc").get();

          const tempDoc = snapshot.docs.map((doc) => {
            return { artId: doc.id, ...doc.data() };
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
        } else if (uid && tagFilter === "" && categoryFilter !== "") {
          console.log("if 2");

          const snapshot = await artList
            .where("category", "==", categoryFilter)
            .orderBy("timeStamp", "desc")
            .get();

          const tempDoc = snapshot.docs.map((doc) => {
            return { artId: doc.id, ...doc.data() };
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
        } else if (uid && tagFilter !== "" && categoryFilter !== "") {
          console.log("if 3");

          const snapshot = await artList
            .where("category", "==", categoryFilter)
            .where("tag", "array-contains", tagFilter)
            .orderBy("timeStamp", "desc")
            .get();

          const tempDoc = snapshot.docs.map((doc) => {
            return { artId: doc.id, ...doc.data() };
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
        } else if (uid && tagFilter !== "" && categoryFilter === "") {
          console.log("if 4");

          const snapshot = await artList
            .where("tag", "array-contains", tagFilter)
            .orderBy("timeStamp", "desc")
            .get();

          const tempDoc = snapshot.docs.map((doc) => {
            return { artId: doc.id, ...doc.data() };
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
        }
      } else {
        toast.warn("🦄 No Post Found!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push("/");
      }
    } catch (error) {
      console.log("error", error);
      toast(error.message, {
        type: "error",
      });
    }
  };

export const getArchiveArtFun =
  ({ uid, history }) =>
  async (dispatch) => {
    try {
      if (uid) {
        const artList = firestore
          .collection("art")
          .where("uid", "==", uid)
          .where("isArchive", "==", true)
          .orderBy("timeStamp", "desc");

        const snapshot = await artList.get();

        const tempDoc = snapshot.docs.map((doc) => {
          return { artId: doc.id, ...doc.data() };
        });

        dispatch({ type: SET_ARCHIVE_ART_LIST, payload: tempDoc });

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
      } else {
        toast.warn("🦄 No Post Found!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push("/");
      }
    } catch (error) {
      console.log("error", error);
      toast(error.message, {
        type: "error",
      });
    }
  };

export const toggleArtArchiveFun =
  ({ artId, archiveValue }) =>
  async (dispatch) => {
    try {
      if (artId) {
        await firestore
          .collection("art")
          .doc(artId)
          .update({
            isArchive: archiveValue,
          })
          .then(() => {
            if (archiveValue) {
              toast("Art Moved to Archive", {
                type: "success",
              });
            } else {
              toast("Art Moved to Public", {
                type: "success",
              });
            }

            dispatch({
              type: REMOVE_ARCHIVE_ART_FROM_ART,
              payload: { artId, archiveValue },
            });
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
      }
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
  };
