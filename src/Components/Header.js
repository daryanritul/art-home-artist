import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { firebaseAuth } from '../firebase';
import './Header.css';
import logo from '../asset/logo.svg';

const Header = () => {
  const handleSignOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        toast('Sign Out', {
          type: 'success',
        });
      })
      .catch(error => {
        console.log('Error', error);
        toast(error.message, {
          type: 'error',
        });
      });
  };

  return (
    // <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
    //   <div className="container-fluid header">
    //     <Link className="navbar-brand" to="/">
    //       artHOME
    //     </Link>
    //     <button
    //       aria-controls="navbarSupportedContent"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //       className="navbar-toggler"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarSupportedContent"
    //       type="button"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/artistprofile">
    //             Profile
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/archive">
    //             Archive
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/art/add">
    //             ADD ART
    //           </Link>
    //         </li>

    //         <li className="nav-item">
    //           <Link className="nav-link" to="/signIn">
    //             Sign IN
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link
    //             className="nav-link"
    //             to="/signIn"
    //             onClick={() => handleSignOut()}
    //           >
    //             Sign Out
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
    <nav className="navbar">
      <img src={logo} />
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
          <p>Sign Out</p>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
