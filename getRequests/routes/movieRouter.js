const express = require("express");
const movieRouter = express.Router();
const Movie = require(`../models/movie.js`);

//get all
movieRouter.get("/", (req, res, next) => {
  Movie.find((err, movies) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200).send(movies);
  });
});

//get one
movieRouter.get("/:movieId", (req, res, next) => {
  movieId = req.params.movieId;
Movie.findOne({movieid:movieId},(err,movie)=>{
if (err) {
  res.status(500)
  return next(err)
}
res.status(200).send(movie)
})

});

//get by genre
movieRouter.get("/search/genre", (req, res, next) => {
  Movie.find({ genre: req.query.genre }, (err, movies) => {
    if (err) {
      const genreError = new Error(
        `There was an issue with the ${movie.genre} choice`
      );
      res.status(500);
      return next(genreError);
    }
    res.status(200).send(movies);
  });
});

//post one
//DataBase used in this
movieRouter.post("/", (req, res, next) => {
  const newMovie = new Movie(req.body);
  newMovie.save((err, savedMovie) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(202).send(savedMovie);
  });
});

//delete one
movieRouter.delete("/:movieId", (req, res, next) => {
  Movie.findOneAndDelete({ _id: req.params.movieId }, (err, deletedItem) => {
    if (err) {
      if (_id === null) {
        res.status(500);
      }
      res.status(500);
      return next(err);
    }
    res
      .status(200)
      .send(`Successfully deleted  ${deletedItem.title} from the DataBase`);
  });
});

//update one
movieRouter.put("/:movieId", (req, res, next) => {
  Movie.findOneAndUpdate(
    { _id: req.params.movieId }, //find this one to update
    req.body, //Update the object with this data
    { new: true },
    (err, updatedMovie) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      res.status(201).send(updatedMovie);
    }
  );
});

module.exports = movieRouter;
