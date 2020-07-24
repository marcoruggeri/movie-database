import React, { useState, useEffect } from "react";
import "./Movie.css";

import Nav from "./Nav";
import Footer from "./Footer";

const Movie = (props) => {
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${props.match.params.id}?api_key=${process.env.REACT_APP_API_KEY_TMDB}`
    )
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.log(error));
    fetch(
      `https://api.themoviedb.org/3/movie/${props.match.params.id}/credits?api_key=${process.env.REACT_APP_API_KEY_TMDB}`
    )
      .then((response) => response.json())
      .then((data) => setCredits(data))
      .catch((error) => console.log(error));
  });

  return (
    <>
      <Nav />
      <main className="main-movie">
        <div className="movie-container">
          {movie && (
            <>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="poster"
                className="movie-image"
              ></img>
              <div className="various">
                <h1 className="movie-title">{movie.title}</h1>
                <span className="movie-score">{movie.vote_average}</span>
                <h3 className="tagline">{movie.tagline}</h3>
                <p className="overview">{movie.overview}</p>
                <p className="runtime">Runtime: {movie.runtime}'</p>
                <p className="release-date">
                  Release date: {movie.release_date}
                </p>
                <span>Genres: </span>
                {movie.genres.map((genre) => (
                  <li key={genre.id} className="movie-genre">
                    {genre.name}
                  </li>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="actors-container">
          <ul className="actors">
            {credits &&
              credits.cast
                .filter((actor) => actor.profile_path)
                .slice(0, 10)
                .map((actor) => (
                  <li key={actor.id} className="actor">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                      alt="actor"
                    ></img>
                    <span className="actor-name">{actor.name}</span>
                  </li>
                ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Movie;
