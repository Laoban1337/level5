const express = require("express");
const { v4: uuidv4 } = require("uuid");
const tvRouter = express.Router();

const tvShows = [
  { title: "Breaking Bad", _id: uuidv4() },
  { title: "Stranger Things", _id: uuidv4() },
  { title: "The Office", _id: uuidv4() },
  { title: "Friends", _id: uuidv4() },
  { title: "The Mandalorian", _id: uuidv4() },
  { title: "The Crown", _id: uuidv4() },
  { title: "Sherlock", _id: uuidv4() },
  { title: "Westworld", _id: uuidv4() },
  { title: "The Witcher", _id: uuidv4() },
];
//get all
tvRouter.get("/", (req, res) => {
  res.send(tvShows);
});

//get one
tvRouter.get("/:tvShowId", (req, res) => {
  tvshowId = req.params.tvShowId;
  foundTvShow = tvShows.find((tvShow) => tvShow._id === tvshowId);
  res.send(foundTvShow);
});

//post one
tvRouter.post("/", (req, res) => {
  const newTvShow = req.body;
  newTvShow._id = uuidv4();
  tvShows.push(newTvShow);
  res.send(`added ${newTvShow.title} to the userDataBase`);
});

module.exports = tvRouter;
