import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Movie from "./components/Movie";
import AddMovieForm from "./components/AddMovieForm.js";

function App() {
  const getMovies = () => {
    axios
      .get("/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.log(err.response.data.errMsg));
  };

  const addMovie = (newMovie) => {
    axios
      .post("/movies", newMovie)
      .then((res) => {
        setMovies((prevMovies) => [...prevMovies, res.data]);
      })
      .catch((err) => console.log("there was an error :", err));
  };

  const deleteMovie = (movieId) => {
    axios
      .delete(`/movies/${movieId}`)
      .then((res) =>
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie._id !== movieId)
        )
      )
      .catch((err) => console.log("There was an error:", err));
  };

  const editMovies = (updatedObject, movieId) => {
    axios
      .put(`/movies/${movieId}`, updatedObject)
      .then((res) => {
        setMovies((prevMovies) =>
          prevMovies.map((movie) => (movie._id !== movieId ? movie : res.data))
        );
      })
      .catch((err) => err);
  };

  const handleFilter = (e) => {
    const { value } = e.target;

    if (value === "reset") {
      getMovies();
    } else {
      axios
        .get(`/movies/search/genre?genre=${value}`)
        .then((res) => setMovies(res.data))
        .catch((err) => err);
    }
  };

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <h4>Filter by genre</h4>
      <select onChange={handleFilter} className="form-select">
        <option value="reset">All Movies</option>
        <option value="action"> action</option>
        <option value="bollywood">bollywood</option>
        <option value="comedy"> comedy</option>
        <option value="documentary">documentary</option>
        <option value="drama"> drama </option>
        <option value="fantasy">fantasy </option>
      </select>
      {movies.map((movie) => (
        <Movie
          {...movie}
          key={movie.title}
          deleteMovie={deleteMovie}
          editMovies={editMovies}
        />
      ))}
      <AddMovieForm submit={addMovie} btnText="Add Movie" />
    </div>
  );
}

export default App;
