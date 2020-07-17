import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Nav from "./Components/Nav";
import Header from "./Components/Header";
import Search from "./Components/Search";
import Movies from "./Components/Movies";
import Movie from "./Components/Movie";

function App() {
  console.log("rendering App");

  const [showing, setShowing] = useState([]);
  const [input, setInput] = useState("");
  const [genreId, setGenreId] = useState([]);

  useEffect(() => {
    fetchPopular();
    fetchGenreId();
  }, []);

  useEffect(() => {
    if (input) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY_TMDB}&query=${input}&page=1&include_adult=false`
      )
        .then((response) => response.json())
        .then((data) => setShowing(data.results));
    } else {
      fetchPopular();
    }
  }, [input]);

  const fetchGenreId = () => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY_TMDB}&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => setGenreId(data.genres))
      .catch((error) => console.log(error));
  };

  const fetchPopular = () => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY_TMDB}`
    )
      .then((response) => response.json())
      .then((data) => setShowing(data.results))
      .catch((error) => console.log(error));
  };

  const fetchTopRated = () => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=5d7ca6293d3aaaefa131dd2209c59847&sort_by=vote_average.desc&include_adult=false&include_video=false&api_key=5d7ca6293d3aaaefa131dd2209c59847&page=1&vote_count.gte=1000&api_key=${process.env.REACT_APP_API_KEY_TMDB}`
    )
      .then((response) => response.json())
      .then((data) => setShowing(data.results))
      .catch((error) => console.log(error));
  };

  const fetchNewest = () => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${new Date(
        new Date().setMonth(new Date().getMonth() - 1)
      )
        .toISOString()
        .substring(
          0,
          10
        )}&primary_release_date.lte=${new Date()
        .toISOString()
        .substring(0, 10)}&api_key=${process.env.REACT_APP_API_KEY_TMDB}`
    )
      .then((response) => response.json())
      .then((data) =>
        setShowing(
          data.results.sort((a, b) =>
            a.release_date < b.release_date ? 1 : -1
          )
        )
      )
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/movie/:id" component={Movie}></Route>
          <Route path="/">
            <Nav />
            <Header
              fetchPopular={fetchPopular}
              fetchNewest={fetchNewest}
              fetchTopRated={fetchTopRated}
            />
            <Search
              input={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Movies showing={showing} genreId={genreId} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
