import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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

import { useDispatch, connect } from "react-redux";
import {
  SET_ARTIST_EMAIL,
  SET_ARTIST_UID,
  SET_ISAUTHENTICATED,
  SET_IS_EMAIL_VERIFIED,
} from "./action/action.type";
import { firebaseAuth } from "./firebase";
import Archive from "./Pages/Archive";

const App = ({ auth, getArtistProfile }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isEmailVerified } = auth;

  const onAuthStateChanged = async (user) => {
    if (user) {
      if (!user.emailVerified) {
        user
          .sendEmailVerification()
          .then(function () {
            console.log("Email send");
            toast("Email send to main id for varifaction", {
              type: "success",
            });
          })
          .catch(function (error) {
            console.log("error", error);
          });
      } else {
        dispatch({ type: SET_IS_EMAIL_VERIFIED, payload: true });
      }
      dispatch({ type: SET_ISAUTHENTICATED, payload: true });
      dispatch({ type: SET_ARTIST_EMAIL, payload: user.email });
      dispatch({ type: SET_ARTIST_UID, payload: user.uid });
      getArtistProfile({ uid: user.uid });
    }
  };

  useEffect(() => {
    const susbcriber = firebaseAuth.onAuthStateChanged(onAuthStateChanged);
    return susbcriber;
  }, []);

  if (isAuthenticated && !isEmailVerified) {
    return <EmailVerifactionPage />;
  }

  return (
    <Router>
      <Header />
      <ToastContainer />

      <Switch>
        <Route exact path="/">
          {isAuthenticated ? <Home /> : <Redirect to="/signIn" />}
        </Route>
        <Route exact path="/archive">
          {isAuthenticated ? <Archive /> : <Redirect to="/signIn" />}
        </Route>

        <Route exact path="/artistprofile">
          {isAuthenticated ? <ArtistProfile /> : <Redirect to="/signIn" />}
        </Route>
        <Route exact path="/editartistprofile">
          {isAuthenticated ? <EditArtistProfile /> : <Redirect to="/signIn" />}
        </Route>
        <Route exact path="/art/:isEdit">
          {isAuthenticated ? <AddArt /> : <Redirect to="/signIn" />}
        </Route>
        <Route exact path="/signin">
          {isAuthenticated ? <Redirect to="/" /> : <SignIn />}
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
