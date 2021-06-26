import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Notes Programming
        </Link>
        <button
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          type="button"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/artistprofile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/archive">
                Archive
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/art/add">
                ADD ART
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/signIn">
                Sign IN
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
