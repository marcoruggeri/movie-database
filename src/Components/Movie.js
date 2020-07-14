import React, { useState, useEffect } from "react";
import "./Movie.css";

import Layout from "./Layout";

const Movie = (props) => {
  console.log("rendering Movie");
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${props.match.params.id}?api_key=${process.env.REACT_APP_API_KEY_TMDB}`
    )
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.log(error));
  });

  return (
    <Layout>
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
        </>
      )}
    </Layout>
  );
};

export default Movie;
