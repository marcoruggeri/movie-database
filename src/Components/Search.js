import React from "react";

const Search = ({ input, onChange, onSubmit }) => {
  console.log("rendering Search");

  return (
    <form onSubmit={onSubmit}>
      <input value={input} onChange={onChange}></input>
      <button>Search</button>
    </form>
  );
};

export default Search;
