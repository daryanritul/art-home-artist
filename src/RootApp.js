import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { firestore } from "./firebase";
import store from "./store";

firestore.enablePersistence().catch((err) => {
  if (err.code === "failed-precondition") {
    console.log(
      " Multiple tabs open, persistence can only be enabled in one tab at a a time"
    );
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code === "unimplemented") {
    console.log(
      "// The current browser does not support all of the features required to enable persistence"
    );
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});

const RootApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default RootApp;
