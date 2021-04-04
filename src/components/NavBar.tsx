import React from "react";
import { Link } from "@reach/router";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Rick and Morty API explorer</span>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/characters">
                Characters
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/episodes">
                Episodes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/locations">
                Locations
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
