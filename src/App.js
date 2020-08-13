import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Nav from "./Components/Nav";
import Header from "./Components/Header";
import Search from "./Components/Search";
import Movies from "./Components/Movies";
import Movie from "./Components/Movie";

function App() {
  const [showing, setShowing] = useState([]);
  const [input, setInput] = useState("");
  const [genreId, setGenreId] = useState([]);
  const [currentQuery, setCurrentQuery] = useState("");
  const [pages, setPages] = useState(0);
  const [loadMoreCounter, setLoadMoreCounter] = useState(2);

  useEffect(() => {
    fetchPopular();
    fetchGenreId();
  }, []);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY_TMDB}&query=${input}&include_adult=false`;
    if (input) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setShowing(data.results);
          setCurrentQuery(url);
          setPages(data.total_pages);
        });
    } else {
      fetchPopular();
    }
  }, [input]);

  const fetchGenreId = () => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY_TMDB}&language=en-US`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setGenreId(data.genres);
      })
      .catch((error) => console.log(error));
  };

  const fetchPopular = () => {
    const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_API_KEY_TMDB}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setShowing(data.results);
        setCurrentQuery(url);
        setPages(data.total_pages);
      })
      .catch((error) => console.log(error));
  };

  const fetchTopRated = () => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=5d7ca6293d3aaaefa131dd2209c59847&sort_by=vote_average.desc&include_adult=false&include_video=false&api_key=5d7ca6293d3aaaefa131dd2209c59847&vote_count.gte=1000&api_key=${process.env.REACT_APP_API_KEY_TMDB}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setShowing(data.results);
        setCurrentQuery(url);
        setPages(data.total_pages);
      })
      .catch((error) => console.log(error));
  };

  const fetchNewest = () => {
    const url = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${new Date(
      new Date().setMonth(new Date().getMonth() - 1)
    )
      .toISOString()
      .substring(
        0,
        10
      )}&primary_release_date.lte=${new Date()
      .toISOString()
      .substring(0, 10)}&api_key=${process.env.REACT_APP_API_KEY_TMDB}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setShowing(
          data.results.sort((a, b) =>
            a.release_date < b.release_date ? 1 : -1
          )
        );
        setCurrentQuery(url);
        setPages(data.total_pages);
      })
      .catch((error) => console.log(error));
  };

  const loadMore = () => {
    fetch(`${currentQuery}&page=${loadMoreCounter}`)
      .then((response) => response.json())
      .then((data) => {
        setShowing((prev) => [...prev, ...data.results]);
        setLoadMoreCounter((prev) => prev + 1);
      })
      .catch((err) => console.log(err));
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
            <Movies
              showing={showing}
              genreId={genreId}
              pages={pages}
              loadMore={loadMore}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
