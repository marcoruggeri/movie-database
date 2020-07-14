import React from "react";
import "./Search.css";

const Search = ({ input, onChange, onSubmit }) => {
  console.log("rendering Search");

  return (
    <form onSubmit={onSubmit} className="search">
      <input value={input} onChange={onChange} className="search-input"></input>
      <button className="search-button">Search</button>
    </form>
  );
};

export default Search;
