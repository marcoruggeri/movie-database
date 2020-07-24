import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <nav>
      {/* <img src="" alt="Logo"></img> */}
      <Link to="/">
        <span id="logo">MovieDB</span>
      </Link>
      {/* <button>Sign in</button> */}
    </nav>
  );
};

export default Nav;
