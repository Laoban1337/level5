const express = require("express");
const { ObjectId } = require("mongodb");//Use the ObjectId.isValid() method to check the validity of the tvShowId.

const tvShowsRouter = express.Router();
const tvShow = require("../models/tvShows.js");

// Get all TV shows
tvShowsRouter.get("/", (req, res, next) => {
  tvShow.find((err, tvShows) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200).send(tvShows);
  });
});

// Get one TV show by ID
tvShowsRouter.get("/:tvShowId", async (req, res, next) => {
  const tvShowId = req.params.tvShowId;

  tvShow.findById(tvShowId, (err, foundTvShow) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!foundTvShow) {
      const error = new Error("Couldn't find a TV show by that ID");
      res.status(404);
      return next(error);
    }
    res.status(200).send(foundTvShow);
  });
});

// Post one TV show
tvShowsRouter.post("/", (req, res, next) => {
  const newTvShow = new tvShow(req.body);
  newTvShow.save((err, savedTvShow) => {
    if (err) {
      const error = new Error("Error saving the TV show");
      res.status(500);
      return next(error);
    }
    res.status(201).send(savedTvShow);
    console.log(`Added ${newTvShow.title} to the TV Show Database`);
  });
});

// Delete one TV show by ID
tvShowsRouter.delete("/:tvShowId", (req, res, next) => {
  tvShow.findOneAndDelete(
    { _id: req.params.tvShowId },
    (err, deletedTvShow) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      if (!deletedTvShow) {
        const error = new Error("Couldn't find a TV show by that ID to delete");
        res.status(404);
        return next(error);
      }
      res
        .status(200)
        .send(
          `The TV show named ${deletedTvShow.title} has been deleted from the database`
        );
    }
  );
});

//update Tv shows
tvShowsRouter.put("/:tvShowId", (req, res, next) => {
  const tvShowId = req.params.tvShowId;
  if (!ObjectId.isValid(tvShowId)) {
    const idError = new Error("Invalid Id, please check you input again");
   res.status(400);
    return next(idError);
  }
  tvShow.findOneAndUpdate(
    { _id: req.params.tvShowId }, //find this one to update(filtering object to find the exact item)
    req.body, //Update the object with this data
    { new: true },
    (err, updatedTvShow) => {
      if (err) {
        const err = new Error(
          `The TvShow at the ${tvShowId} with the name ${updatedTvShow.title} could not be added or Updated. Please check your data.`
        );
        res.status(500);
        return next(err);
      }
      res.status(201).send(updatedTvShow);
    }
  );
});

module.exports = tvShowsRouter;
