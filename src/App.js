import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Header from "./Components/Header";
// Pages
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import EmailVerifactionPage from "./Pages/EmailVerifactionPage";
import EditArtistProfile from "./Pages/EditArtistProfile";
import ArtistProfile from "./Pages/ArtistProfile";
import AddArt from "./Pages/AddArt";

import { getArtistProfile } from "./action/auth";

// Firebase
import firebase from "firebase/app";

import { useDispatch, connect } from "react-redux";
import {
  SET_ARTIST_EMAIL,
  SET_ARTIST_PROFILE,
  SET_ARTIST_UID,
  SET_ISAUTHENTICATED,
  SET_IS_EMAIL_VERIFIED,
} from "./action/action.type";

const App = ({ auth, getArtistProfile }) => {
  const dispatch = useDispatch();

  const onAuthStateChanged = async (user) => {
    if (user) {
      if (!user.emailVerified) {
        user
          .sendEmailVerification()
          .then(function () {
            console.log("Email send");
          })
          .catch(function (error) {
            console.log("error", error);
          });
      } else {
        dispatch({ type: SET_IS_EMAIL_VERIFIED, payload: true });
        dispatch({ type: SET_ISAUTHENTICATED, payload: true });
        dispatch({ type: SET_ARTIST_EMAIL, payload: user.email });
        dispatch({ type: SET_ARTIST_UID, payload: user.uid });
      }

      getArtistProfile({ uid: user.uid });
    }
  };

  useEffect(() => {
    const susbcriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return susbcriber;
  }, []);
  console.log("auth", auth);

  return (
    <Router>
      <Header />
      <ToastContainer />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/artistprofile">
          <ArtistProfile />
        </Route>
        <Route exact path="/editartistprofile">
          <EditArtistProfile />
        </Route>
        <Route exact path="/art/:isEdit">
          <AddArt />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/emailverifaction">
          <EmailVerifactionPage />
        </Route>
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  getArtistProfile: (data) => getArtistProfile(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
