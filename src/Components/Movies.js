import React from "react";
import { Link } from "react-router-dom";
import "./Movies.css";

const Movies = ({ showing, genreId }) => {
  console.log("rendering Movies");
  return (
    <div className="movies">
      {showing &&
        showing.map((movie) => (
          <div key={movie.id} className="movie">
            <p className="title">{movie.title}</p>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="poster"
              ></img>
            </Link>
            <p className="score">{movie.vote_average}</p>
            {movie.genre_ids.map((genreID) => (
              <li key={genreID}>
                {Object.keys(genreId)
                  .filter((genre) => genreID === genreId[genre].id)
                  .map((genre) => genreId[genre].name)}
              </li>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Movies;
