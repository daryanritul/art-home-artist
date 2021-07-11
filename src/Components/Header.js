import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { firebaseAuth } from '../firebase';
import './Header.css';
import logo from '../asset/logo.svg';
import { useDispatch } from 'react-redux';
import { ARTIST_LOGGED_OUT } from '../action/action.type';

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        toast('Sign Out', {
          type: 'success',
        });
        dispatch({ type: ARTIST_LOGGED_OUT });
      })
      .catch(error => {
        console.log('Error', error);
        toast(error.message, {
          type: 'error',
        });
      });
  };

  return (
    <nav className={`nav ${toggle ? 'toggler' : ''}`}>
      <Link className="nav__brand" href="#" to="/">
        <img src={logo} alt="" />
      </Link>

      <ul className="nav__list">
        <li>
          <Link className="nav-link" to="/">
            My Arts
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/artistprofile">
            My Profile
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/art/add">
            Add Art
          </Link>
        </li>
        <span>
          <li>
            <Link
              className="nav-link"
              to="/signIn"
              onClick={() => handleSignOut()}
            >
              Sign Out
            </Link>
          </li>
        </span>
      </ul>
      <div className="menu-btn" onClick={() => setToggle(!toggle)}>
        <div className="menu-btn__burger"></div>
      </div>
    </nav>
  );
};

export default Header;
