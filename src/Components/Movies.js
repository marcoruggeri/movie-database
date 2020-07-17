import React from "react";
import { Link } from "react-router-dom";
import "./Movies.css";

import Footer from "./Footer";

const Movies = ({ showing, genreId }) => {
  return (
    <>
      <div className="movies">
        {showing &&
          showing.map(
            (movie) =>
              movie.poster_path && (
                <div key={movie.id} className="movie">
                  <p className="movies-title">{movie.title}</p>
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt="poster"
                    ></img>
                  </Link>
                  {/* <p className="score">{movie.vote_average}</p> */}
                  <ul className="genre-list">
                    {movie.genre_ids.map((genreID) => (
                      <li key={genreID}>
                        {Object.keys(genreId)
                          .filter((genre) => genreID === genreId[genre].id)
                          .map((genre) => genreId[genre].name)}
                      </li>
                    ))}
                  </ul>
                </div>
              )
          )}
      </div>
      <Footer />
    </>
  );
};

export default Movies;
