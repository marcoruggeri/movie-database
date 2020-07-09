import React from "react";

const Header = ({ fetchPopular, fetchNewest, fetchTopRated }) => {
  console.log("rendering Header");

  return (
    <div>
      <button onClick={fetchPopular}>Popular</button>
      <button onClick={fetchTopRated}>Top Rated</button>
      <button onClick={fetchNewest}>Newest</button>
    </div>
  );
};

export default Header;
