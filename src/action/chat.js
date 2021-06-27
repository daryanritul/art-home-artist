import { toast } from "react-toastify";
import { SET_CHAT, SET_CHAT_OBSERVER } from "./action.type";

import firebase from "firebase/app";
import { firestore } from "../firebase";

export const sendMessageFun =
  ({ message, uid }) =>
  async (dispatch) => {
    firestore
      .collection("chat")
      .doc(uid)
      .collection("messageList")
      .doc()
      .set({
        uid,
        message,
        timeStamp: firebase.firestore.Timestamp.now(),
        isByUser: true,
        isSeen: false,
      })
      .catch((error) => {
        console.log(error);
        toast(error.message, {
          type: "error",
        });
      });
  };

export const getChatFun =
  ({ uid, history }) =>
  async (dispatch) => {
    try {
      const unsub = firestore
        .collection("chat")
        .doc(uid)
        .collection("messageList")
        .orderBy("timeStamp")
        .onSnapshot(
          (querySnapshot) => {
            const tempDoc = querySnapshot.docs.map((doc) => {
              return { artId: doc.id, ...doc.data() };
            });
            dispatch({ type: SET_CHAT, payload: tempDoc });
            if (querySnapshot.size === 0) {
              toast.warn("🦄 No Chat Found!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          },
          (err) => {
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
        );

      console.log("onserver", unsub);

      dispatch({ type: SET_CHAT_OBSERVER, payload: unsub });
    } catch (error) {
      console.log(error);
      toast(error.message, {
        type: "error",
      });
    }
  };
