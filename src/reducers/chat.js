import {
  SET_CHAT,
  SET_CHAT_OBSERVER,
  SET_LAST_MESSAGE,
  SET_MESSAGE,
} from "../action/action.type";

const initialState = {
  chatList: [],
  message: "",
  lastMessage: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAT:
      return {
        ...state,
        chatList: action.payload,
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };

    case SET_LAST_MESSAGE:
      return {
        ...state,
        lastMessage: action.payload,
      };

    default:
      return state;
  }
};
