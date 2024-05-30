const express = require("express");
const bountyRouter = express.Router();
const Bounty = require("../models/Bounty");

//get all bounties
bountyRouter.get("/", (req, res, next) => {
  Bounty.find((err, bounties) => {
    if (err) {
      res.status(500);
      console.log(err);
      return next(err);
    }
    res.status(200).send(bounties);
  });
});

//get one
bountyRouter.get("/:bountyId", (req, res, next) => {
  const bountyId = req.params.bountyId;
  Bounty.findById(bountyId, (err, foundBounty) => {
    if (err || !foundBounty) {
      res.status(500);
      return next(err);
    }
    res.status(200).send(foundBounty);
  });
});

//post one bounty
bountyRouter.post("/", (req, res, next) => {
  const newBounty = new Bounty(req.body);
  newBounty.save((err, savedBounty) => {
    if (err) {
      res.status(500);
      console.log(err);
      return next(err);
    }
    res.status(200).send(savedBounty);
  });

  // res.send(`successfully added ${newBounty.firstName} to the bounty list`);
});

//search by type
bountyRouter.get("/search/type", (req, res, next) => {
  const query = req.query.type;
  if (!query) {
    const error = new Error("You have to specify a type");
    res.status(500);
    return next(error);
  }
  Bounty.find({ type: query }, (err, bounty) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200).send(bounty);
  });
});

//update one Bounty
bountyRouter.put("/:bountyId", (req, res, next) => {
  const bountyId = req.params.bountyId;
  const updatedBountyInfo = req.body;
  Bounty.findOneAndUpdate(
    { _id: bountyId },
    updatedBountyInfo,
    {
      new: true,
    },
    (err, updatedBounty) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      res.status(200).send(updatedBounty);
    }
  );
});

//delete a bounty
bountyRouter.delete("/:bountyId", (req, res, next) => {
  const bountyId = req.params.bountyId;
  Bounty.findOneAndDelete({ _id: bountyId }, (err, deletedBounty) => {
    if (err || bountyId === null) {
      res.status(500);
      return next(err);
    }
    res
      .status(200)
      .send(
        `Successfully deleted a Bounty  ${deletedBounty.firstName} ${deletedBounty.lastName} with the  id ${bountyId}`
      );
  });
});

module.exports = bountyRouter;
