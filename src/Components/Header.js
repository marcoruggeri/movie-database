import React from "react";
import "./Header.css";

const Header = ({ fetchPopular, fetchNewest, fetchTopRated }) => {
  console.log("rendering Header");

  return (
    <header className="header">
      <button onClick={fetchPopular} className="header-button">
        Popular
      </button>
      <button onClick={fetchTopRated} className="header-button">
        Top Rated
      </button>
      <button onClick={fetchNewest} className="header-button">
        Newest
      </button>
    </header>
  );
};

export default Header;
