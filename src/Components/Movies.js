import React from "react";
import { Link } from "react-router-dom";
import "./Movies.css";

import Footer from "./Footer";

const Movies = ({ showing, genreId, pages, loadMore }) => {
  let pagesArray = [];
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }
  return (
    <>
      <div className="movies">
        {showing &&
          showing.map(
            (movie) =>
              movie.poster_path && (
                <div key={movie.id} className="movie">
                  <p className="movies-title">
                    {movie.title.length < 35
                      ? movie.title
                      : movie.title.substring(0, 35) + "..."}
                  </p>
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt="poster"
                    ></img>
                  </Link>
                  <ul className="genre-list">
                    {movie.genre_ids.slice(0, 2).map((genreID) => (
                      <li key={genreID}>
                        {Object.keys(genreId)
                          .filter((genre) => genreID === genreId[genre].id)
                          .map((genre) => genreId[genre].name)}
                      </li>
                    ))}
                  </ul>
                  <span className="score">{movie.vote_average}</span>
                </div>
              )
          )}
      </div>
      <button className="loadMore" onClick={loadMore}>
        Load More
      </button>
      <Footer />
    </>
  );
};

export default Movies;
