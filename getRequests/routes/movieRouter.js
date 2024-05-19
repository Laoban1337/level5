const express = require("express");
const { v4: uuidv4 } = require("uuid");
const movieRouter = express.Router();

const movies = [
  { title: "The Shawshank Redemption", genre: "Drama", _id: uuidv4() },
  { title: "The Godfather", genre: "Crime", _id: uuidv4() },
  { title: "The Dark Knight", genre: "Action", _id: uuidv4() },
  { title: "Pulp Fiction", genre: "Crime", _id: uuidv4() },
  { title: "Forrest Gump", genre: "Drama", _id: uuidv4() },
  { title: "Inception", genre: "Sci-Fi", _id: uuidv4() },
  { title: "The Matrix", genre: "Sci-Fi", _id: uuidv4() },
  { title: "Fight Club", genre: "Drama", _id: uuidv4() },
  { title: "Interstellar", genre: "Sci-Fi", _id: uuidv4() },
];

//get all
movieRouter.get("/", (req, res) => {
  res.send(movies);
});

//get one
movieRouter.get("/:movieId", (req, res) => {
  movieId = req.params.movieId;
  foundMovie = movies.find((movie) => movie._id === movieId);
  if (foundMovie) {
    res.send(foundMovie);
  } else if (!foundMovie) {
    res.status(404).send("No movies found by that name or id");
  }
});

//get by genre
movieRouter.get("/search/genre", (req, res) => {
  const genre = req.query.genre;
  filteredMovies = movies.filter((movie) => movie.genre === genre);
  res.send(filtedMovies);
});

//post one
movieRouter.post("/", (req, res) => {
  const newMovie = req.body;
  newMovie._id = uuidv4();
  movies.push(newMovie);
  res.send(`added ${newMovie.title} to the userDataBase`);
});

//delete one
movieRouter.delete("/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  const movieIndex = movies.findIndex((movie) => movie._id === movieId);
  movies.splice(movieIndex, 1);
  res.send(
    ` Suuccessfully Deleted a movie with the ID of ${movieId} from the DataBase`
  );
});

//update one
movieRouter.put("/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  const updatedObject = req.body
  const movieIndex = movies.findIndex((movie) => movie._id === movieId);
  const updatedMovie = Object.assign(movies[movieIndex],updatedObject);
  res.send(updatedMovie)
});

module.exports = movieRouter;
