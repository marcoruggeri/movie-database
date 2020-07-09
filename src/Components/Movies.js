import React from "react";
import { Link } from "react-router-dom";

const Movies = ({ showing, genreId }) => {
  console.log("rendering Movies");
  return (
    <div>
      {showing &&
        showing.map((movie) => (
          <div key={movie.id}>
            {movie.title}
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="poster"
              ></img>
            </Link>
            {movie.vote_average}
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
