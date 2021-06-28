import { readAndCompressImage } from "browser-image-resizer";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { firestore, storage } from "../firebase";
import firebase from "firebase/app";

import {
  CLEAR_ADD_ART_STATE,
  SET_ART_LIST,
  REMOVE_ART_FROM_ART,
  SET_ARCHIVE_ART_LIST,
  SET_ART_IMAGE_URL,
  SET_ART_DOWNLOAD_URL,
  SET_ART_DOWNLOAD_UPLOAD_STATUS,
  SET_ART_DOWNLOAD_NAME,
  SET_LAST_ART,
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
        timeStamp: firebase.firestore.Timestamp.now(),
        tag,
        isArchive: false,
        artistname: artistProfile.name,
        artistprofilePicUrl: artistProfile.profilePicUrl,
        artistdateStarted: artistProfile.dateStarted,
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
    artistProfile,
    history,
  }) =>
  async (dispatch) => {
    try {
      if (artId) {
        await firestore
          .collection("art")
          .doc(artId)
          .update({
            category,
            downloadUrl,
            description,
            artName,
            imageUrl,
            tag,
            timeStamp: firebase.firestore.Timestamp.now(),
            artistname: artistProfile.name,
            artistprofilePicUrl: artistProfile.profilePicUrl,
            artistdateStarted: artistProfile.dateStarted,
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
        toast("We Dont Recive Art id or User ID .... Please Try agnain", {
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
  ({ artId, archiveValue }) =>
  async (dispatch) => {
    await firestore
      .collection("art")
      .doc(artId)
      .delete()
      .then(() => {
        toast("Art Delete", {
          type: "success",
        });
        dispatch({
          type: REMOVE_ART_FROM_ART,
          payload: { artId, archiveValue },
        });
      })
      .catch((error) => {
        console.log(error);
        toast(error.message, {
          type: "error",
        });
      });
  };

export const getArtListFun =
  ({ uid, history, tagFilter, categoryFilter, lastArt }) =>
  async (dispatch) => {
    try {
      if (uid) {
        const artList = firestore
          .collection("art")
          .where("uid", "==", uid)
          .where("isArchive", "==", false);

        if (uid && tagFilter === "" && categoryFilter === "") {
          const snapshot = await artList
            .orderBy("timeStamp", "desc")
            .startAfter(lastArt)
            .limit(4)
            .get();

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
          } else {
            const tempDoc = snapshot.docs.map((doc) => {
              return { artId: doc.id, ...doc.data() };
            });
            dispatch({
              type: SET_LAST_ART,
              payload: snapshot.docs[snapshot.docs.length - 1],
            });
            dispatch({ type: SET_ART_LIST, payload: tempDoc });
          }
        } else if (uid && tagFilter === "" && categoryFilter !== "") {
          const snapshot = await artList
            .where("category", "==", categoryFilter)
            .orderBy("timeStamp", "desc")
            .startAfter(lastArt)
            .limit(4)
            .get();

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
          } else {
            const tempDoc = snapshot.docs.map((doc) => {
              return { artId: doc.id, ...doc.data() };
            });
            dispatch({
              type: SET_LAST_ART,
              payload: snapshot.docs[snapshot.docs.length - 1],
            });
            dispatch({ type: SET_ART_LIST, payload: tempDoc });
          }
        } else if (uid && tagFilter !== "" && categoryFilter !== "") {
          const snapshot = await artList
            .where("category", "==", categoryFilter)
            .where("tag", "array-contains", tagFilter)
            .orderBy("timeStamp", "desc")
            .startAfter(lastArt)
            .limit(4)
            .get();

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
          } else {
            const tempDoc = snapshot.docs.map((doc) => {
              return { artId: doc.id, ...doc.data() };
            });
            dispatch({
              type: SET_LAST_ART,
              payload: snapshot.docs[snapshot.docs.length - 1],
            });
            dispatch({ type: SET_ART_LIST, payload: tempDoc });
          }
        } else if (uid && tagFilter !== "" && categoryFilter === "") {
          const snapshot = await artList
            .where("tag", "array-contains", tagFilter)
            .orderBy("timeStamp", "desc")
            .startAfter(lastArt)
            .limit(4)
            .get();

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
          } else {
            const tempDoc = snapshot.docs.map((doc) => {
              return { artId: doc.id, ...doc.data() };
            });
            dispatch({
              type: SET_LAST_ART,
              payload: snapshot.docs[snapshot.docs.length - 1],
            });
            dispatch({ type: SET_ART_LIST, payload: tempDoc });
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
          toast.warn("🦄 No ART Found!", {
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
        toast.warn("🦄 Some Thing Went Wrong!", {
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
              type: REMOVE_ART_FROM_ART,
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

export const uploadArtImageFun =
  ({ event, uid }) =>
  async (dispatch) => {
    try {
      const imageFile = event.target.files[0];

      console.log("imageFile", imageFile.name);
      const config = {
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 2000,
        autoRotate: true,
        debug: true,
      };
      // TO compress file
      const compressedFile = await readAndCompressImage(imageFile, config);
      // To gernate Uniq file letter name for file
      const fileId = nanoid(5);

      dispatch({
        type: SET_ART_DOWNLOAD_NAME,
        payload: fileId + imageFile.name,
      });

      // Gernating referance to upload compress image

      var storageRefCompressedFile = storage.ref(
        uid + "/COMP" + fileId + imageFile.name
      );
      // Upload task start
      const uploadTaskCompressedFile =
        storageRefCompressedFile.put(compressedFile);
      // track task
      uploadTaskCompressedFile.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Art Image Upload  is " + progress + "% done");
        },
        (error) => {
          toast(error.message, {
            type: "error",
          });
        },
        () => {
          uploadTaskCompressedFile.snapshot.ref
            .getDownloadURL()
            .then((downloadURL) => {
              console.log("downloadURL COM", downloadURL);
              dispatch({
                type: SET_ART_IMAGE_URL,
                payload: downloadURL,
              });
            });
        }
      );

      // Referance to upload full size image
      var storageRef = storage.ref(uid + "/" + fileId + imageFile.name);
      // Upload task start

      const uploadTask = storageRef.put(imageFile);
      // Track task
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Image Upload  is " + progress + "% done");
          dispatch({
            type: SET_ART_DOWNLOAD_UPLOAD_STATUS,
            payload: "Image Upload  is " + progress + "% done",
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
              type: SET_ART_DOWNLOAD_URL,
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

export const deleteArtImageFun =
  ({ uid, downloadName }) =>
  async (dispatch) => {
    console.log("downloadName", downloadName);
    const storageRef = storage.ref();
    const compImageref = storageRef.child(uid + "/COMP" + downloadName);

    // Delete the file
    compImageref
      .delete()
      .then(() => {
        console.log("File delted");
      })
      .catch((error) => {
        console.log("Error", error);
      });
    const imageref = storageRef.child(uid + "/" + downloadName);

    // Delete the file
    imageref
      .delete()
      .then(() => {
        console.log("File delted");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
