import { toast } from "react-toastify";
import {
  SET_CHAT,
  SET_CHAT_OBSERVER,
  SET_LAST_MESSAGE,
  SET_MESSAGE,
} from "./action.type";

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
      .then(() => dispatch({ type: SET_MESSAGE, payload: "" }))
      .catch((error) => {
        console.log(error);
        toast(error.message, {
          type: "error",
        });
      });
  };
