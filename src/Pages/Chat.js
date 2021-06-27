import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { SET_CHAT, SET_MESSAGE } from "../action/action.type";
import { getChatFun, sendMessageFun } from "../action/chat";
import { firestore } from "../firebase";

const Chat = ({
  message,
  chatList,
  uid,
  sendMessageFun,
  getChatFun,
  observer,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
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

    return () => unsub();
  }, []);

  return (
    <div className="container border border-3 border-dark mt-2 p-3">
      <h3 className="text-center text-dark">CHAT WITH ADMIN</h3>

      <div
        className="d-flex p-2 flex-column-reverse "
        style={{ height: "500px" }}
      >
        <div className="row">
          <div className="col-md-10">
            <input
              className="form-control m-2"
              value={message}
              onChange={(e) => {
                console.log("event", e.target.value);
                dispatch({ type: SET_MESSAGE, payload: e.target.value });
              }}
            />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-success m-2"
              onClick={() => sendMessageFun({ message, uid })}
            >
              Send
            </button>
          </div>
        </div>
        <div className="overflow-scroll ">
          {chatList.map((message) => (
            <div className="bg-dark text-white m-3 w-25">
              <p>{message.message}</p>
              <p>{message.timeStamp.toDate().toLocaleTimeString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  message: state.chat.message,
  chatList: state.chat.chatList,
  observer: state.chat.observer,
  uid: state.auth.uid,
});

const mapDispatchToProps = {
  getChatFun: (data) => getChatFun(data),
  sendMessageFun: (data) => sendMessageFun(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
