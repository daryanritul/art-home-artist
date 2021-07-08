import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { firebaseAuth } from "../firebase";
import "./Header.css";
import logo from "../asset/logo.svg";
import { useDispatch } from "react-redux";
import { ARTIST_LOGGED_OUT } from "../action/action.type";

const Header = () => {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        toast("Sign Out", {
          type: "success",
        });
        dispatch({ type: ARTIST_LOGGED_OUT });
      })
      .catch((error) => {
        console.log("Error", error);
        toast(error.message, {
          type: "error",
        });
      });
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="not found" />
      <div className="nav__items">
        <Link className="nav-link" to="/">
          <p>My Arts</p>
        </Link>

        <Link className="nav-link" to="/archive">
          <p>My Archives</p>
        </Link>
        <Link className="nav-link" to="/artistprofile">
          <p>My Profile</p>
        </Link>
        <Link className="nav-link" to="/art/add">
          <p>Add Art</p>
        </Link>
        <Link className="nav-link" to="/signIn" onClick={() => handleSignOut()}>
          <p>Sign Out</p>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
