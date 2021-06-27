import {
  SET_CHAT,
  SET_CHAT_OBSERVER,
  SET_MESSAGE,
} from "../action/action.type";

const initialState = {
  chatList: [],
  message: "",
  observer: null,
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
    case SET_CHAT_OBSERVER:
      return {
        ...state,
        observer: action.payload,
      };

    default:
      return state;
  }
};
